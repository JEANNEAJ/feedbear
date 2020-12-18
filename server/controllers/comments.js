// import Mongoose from "mongoose";
import FeedbackComments, { Comment } from "../models/comments.js";
import FormMessage from '../models/formMessage.js';

// getting all comments for feedback with id of feedbackId (where feedbackId is already part of the route)
export const getComments = async (req, res) => {
  const { feedbackId } = req.params;

  try {
    const commentList = await FormMessage.find(
      { _id: feedbackId },
      { comments: 1 },
    );
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
   
  const newComment = new Comment({ userId, ...body });

  try {
    await FormMessage.updateOne(
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
  if (!req.session.user) throw 'Not logged in!';
  const userId = req.session.user._id;
  const { feedbackId, commentId } = req.params;
  const validUser = await verifyUser(userId, feedbackId, commentId);

  if (validUser) {
    const newComment = Object.keys(req.body)[0];

    try {
      const updatedComment = await FeedbackComments.updateOne(
        { _id: feedbackId, "comments._id": commentId }, // filter
        { $set: { "comments.$.comment": newComment } } // update
      );
      res.status(201).json(updatedComment);
    } catch (err) {
      console.error(err);
      res.status(409).json({ message: err });
    }
  } else {
    res.status(403).json({ message: 'Invalid user' });
  }
};

export const deleteComment = async (req, res) => {
  if (!req.session.user) throw 'Not logged in!';
  const userId = req.session.user._id;
  const { feedbackId, commentId } = req.params;
  const validUser = await verifyUser(userId, feedbackId, commentId);

  if (validUser) {
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
  } else {
    res.status(403).json({ message: 'Invalid user' });
  }
};

/** 
 * Verify that the provided comment belongs to correct user
 * @returns true if the userId matches the id on the comment, false if it doesn't match or if there's an error
 */
const verifyUser = async (userId, feedbackId, commentId) => {
  try {
    const comment = await FeedbackComments.findOne(
      { _id: feedbackId }, // query
      { comments: { "$elemMatch": { _id: commentId } } } // projection
    );
    const commentUserId = comment.comments[0].userId;

    //TODO userId is a string and commentUserId is an object. Stricter type checking
    if (userId == commentUserId) return true;
    else return false;

  } catch (err) {
    console.error(err);
    return false;
  }
}