import Mongoose from "mongoose";
import FormMessage from "../models/formMessage.js";
import { deleteImage, uploadImage } from "../helpers/helpers.js";

export const updateFeedbackDetails = async (req, res) => {
  const { id: _id } = req.params;
  const body = req.body;

  const feedbackRequest = await FormMessage.findById(_id);
  if (!feedbackRequest)
    return res.status(404).send(`No post with ID ${_id} exists.`);

  // if a file was included, upload to GCS and store the URL
  try {
    if (req.file) {
      // if there's a file to replace, get its URL and target for deletion
      const existingURL = feedbackRequest.file;
      const fileURL = await uploadImage(req.file, existingURL);
      body.file = fileURL;
    }
    
    const result = await FormMessage.findByIdAndUpdate(_id, body, {
      new: true,
    });
    res.status(200).json(result);
  } catch (error) {
    throw new Error("file upload failed, feedback request was not created");
  }
};

export const deleteFeedbackRequest = async (req, res) => {
  const { id: _id } = req.params;

  if (!Mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
  else {
    try {
      await FormMessage.findByIdAndRemove(_id);
      res.json({ message: "Feedback Request deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
};
