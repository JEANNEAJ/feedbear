import Mongoose from "mongoose";
import FormMessage from "../models/formMessage.js";

export const updateFeedbackDetails = async (req, res) => {
  const { id: _id } = req.params;
  const feedbackDetails = req.body;

  if (!Mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
  else {
    try {
      const updateDetails = await FormMessage.findByIdAndUpdate(_id, feedbackDetails, { new: true });
      res.status(200).json(updateDetails);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
}

export const deleteFeedbackRequest = async (req, res) => {
  const { id: _id } = req.params;

  if (!Mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
  else {
    try {
      await FormMessage.findByIdAndRemove(_id);
      res.json({ message: 'Feedback Request deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
}