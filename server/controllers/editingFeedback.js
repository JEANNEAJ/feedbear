import Mongoose from "mongoose";
import FormMessage from "../models/formMessage.js";
import { deleteImage, uploadImage } from "../helpers/helpers.js";

export const updateFeedbackDetails = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    const body = req.body;

    // retrieve the feedback request corresponding to _id
    const feedbackRequest = await FormMessage.findById(_id);
    if (!feedbackRequest)
      return res.status(404).send(`No post with ID ${_id} exists.`);

    // if an existing file was removed in the update, delete the file
    const fileWasRemoved = feedbackRequest.file && !body.file;
    if (fileWasRemoved) {
      await deleteImage(feedbackRequest.file);
      body.file = null;
    }

    // if body.file exists but doesn't match the existing URL, remove it! XSS risk
    if (body.file && body.file !== feedbackRequest.file) delete body.file;

    // if a new file was upload, upload it to storage
    if (req.file) {
      // if there's a file to replace, get its URL and target for deletion
      const existingURL = feedbackRequest.file;
      const fileURL = await uploadImage(req.file, existingURL);
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
  const { id: _id } = req.params;

  if (!Mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");
  else {
    try {
      await FormMessage.findByIdAndRemove(_id);
      res.json({ message: "Feedback Request deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
};
