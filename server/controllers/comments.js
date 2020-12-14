// import Mongoose from "mongoose";
import FeedbackComments, { Comment } from "../models/comments.js";

// getting all comments for feedback with id of feedbackId (where feedbackId is already part of the route)
export const getComments = async (req, res) => {
  const { feedbackId } = req.params;

  try {
    const commentList = await FeedbackComments.find({ _id: feedbackId });
    res.status(200).json(commentList);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export const createComment = async (req, res) => {
  if (!req.session.user) throw 'Not logged in!';
  const userId = req.session.user._id;
  const body = req.body;
  const { feedbackId } = req.params;
   
  const newComment = new Comment({ userId, ...body })

  try {
    await FeedbackComments.updateOne(
      { _id: feedbackId }, // filter
      { $push: { comments: newComment } }, // update
      { upsert: true } // create document if not found
    );
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(409).json({ message: err });
  }
};

export const editComment = async (req, res) => {

}

export const deleteComment = async (req, res) => {
  // console.log('delete comment', req.params);
  if (!req.session.user) throw 'Not logged in!';
  //TODO add server-side validation that this comment belongs to user
  const userId = req.session.user._id;
  const { feedbackId, commentId } = req.params;

  try {
    const deletedComment = await FeedbackComments.updateOne(
      { _id: feedbackId }, // filter
      { $pull: { comments: { _id: commentId } } } // update
    ); 
    res.status(201).json(deletedComment);
  } catch (err) {
    console.error(err);
    res.status(409).json({ message: err });
  }
}
