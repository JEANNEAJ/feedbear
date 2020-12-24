import Mongoose from "mongoose";
import FormMessage from "../models/formMessage.js";
import { deleteImage, uploadImage } from "../helpers/helpers.js";

export const updateFeedbackDetails = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const { id: _id } = req.params;
    const body = req.body;

    // retrieve the feedback request corresponding to _id
    const feedbackRequest = await FormMessage.findById(_id);
    if (!feedbackRequest)
      return res.status(404).send(`No post with ID ${_id} exists.`);

    // verify that the user owns this document
    if (feedbackRequest.userId != userId) {
      // TODO: convert to generic 403 error type
      return res
        .status(403)
        .send("Permission denied: you do not own this resource.");
    }

    // if an existing file was removed in the update, delete the file
    const fileWasRemoved = feedbackRequest.file && !body.file;
    const fileWasReplaced = feedbackRequest.file && req.file;
    if (fileWasRemoved || fileWasReplaced) {
      await deleteImage(feedbackRequest.file);
      body.file = null;
    }

    // if body.file exists but doesn't match the existing URL, remove it! XSS risk
    if (body.file && body.file !== feedbackRequest.file) delete body.file;

    // if a new file was attached, upload it to storage
    if (req.file) {
      const fileURL = await uploadImage(req.file);
      body.file = fileURL;
    }

    const result = await FormMessage.findByIdAndUpdate(_id, body, {
      new: true,
    });
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};

export const deleteFeedbackRequest = async (req, res) => {
  const userId = req.session.user._id;
  const { id: _id } = req.params;

  if (!Mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");
  else {
    try {
      const feedbackRequest = await FormMessage.findById(_id);      
      // verify that the user owns this document
      if (feedbackRequest.userId != userId) {
        // TODO: convert to generic 403 error type
        return res
          .status(403)
          .send("Permission denied: you do not own this resource.");
      }

      await FormMessage.findByIdAndRemove(_id);
      res.json({ message: "Feedback Request deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
};
