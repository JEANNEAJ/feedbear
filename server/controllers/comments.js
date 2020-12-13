import Mongoose from "mongoose";
import Comment from "../models/comments.js";

// getting all comments for feedback with id of feedbackId (where feedbackId is already part of the route)
export const getComments = async (req, res) => {
  const { id } = req.params;
  // const { type } = req.query; // _id, userId

  try {
    const commentList = await Comment.find();
    res.status(200).json(commentList);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export const createComment = async (req, res) => {
  console.log('createComment');
  console.log(req);
  const body = req.body;
  console.log(body);

  const newComment = new Comment(body);

  try {
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(409).json({ message: err });
  }
};