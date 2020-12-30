import Mongoose from "mongoose";
import Comment from "../models/comments.js";
import Project from "../models/projects.js";

// getting all comments for feedback with id of feedbackId (where feedbackId is already part of the route)
export const getComments = async (req, res, next) => {
  const { feedbackId } = req.params;

  try {
    const commentList = await Project.find(
      { _id: feedbackId },
      { comments: 1 }
    );
    res.status(200).json(commentList);
  } catch (err) {
    console.error(err);
    const error = new Error();
    error.message = `Failed to get comments: no Feedback Request with id ${feedbackId}.`;
    error.status = 404;
    return next(error);
  }
};

export const createComment = async (req, res, next) => {
  const userId = req.session.user._id;
  const body = req.body;
  const { feedbackId } = req.params;

  const newComment = new Comment({ userId, ...body });

  try {
    // push comment to array
    await Project.updateOne(
      { _id: feedbackId }, // filter
      { $push: { comments: newComment } }, // update
      { upsert: true } // create document if not found
    );

    await updateNumComments(feedbackId);

    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const editComment = async (req, res, next) => {
  const userId = req.session.user._id;
  const { feedbackId, commentId } = req.params;
  const validUser = await verifyUser(userId, feedbackId, commentId);

  if (validUser) {
    const newComment = Object.keys(req.body)[0];

    try {
      const updatedComment = await Project.updateOne(
        { _id: feedbackId, "comments._id": commentId }, // filter
        { $set: { "comments.$.comment": newComment } } // update
      );
      res.status(201).json(updatedComment);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  } else {
    res.status(403).json({ message: "Invalid user" });
  }
};

export const deleteComment = async (req, res, next) => {
  const userId = req.session.user._id;
  const { feedbackId, commentId } = req.params;
  const validUser = await verifyUser(userId, feedbackId, commentId);

  if (validUser) {
    try {
      const deletedComment = await Project.updateOne(
        { _id: feedbackId }, // filter
        { $pull: { comments: { _id: commentId } } } // update
      );
      await updateNumComments(feedbackId);
      res.status(201).json(deletedComment);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  } else {
    res.status(403).json({ message: "Invalid user" });
  }
};

/**
 * Verify that the provided comment belongs to correct user
 * @returns true if the userId matches the id on the comment, false if it doesn't match or if there's an error
 */
const verifyUser = async (userId, feedbackId, commentId) => {
  try {
    const comment = await Project.findOne(
      { _id: feedbackId }, // query
      { comments: { $elemMatch: { _id: commentId } } } // projection
    );
    const commentUserId = comment.comments[0].userId;

    //TODO userId is a string and commentUserId is an object. Stricter type checking
    if (userId == commentUserId) return true;
    else return false;
  } catch (err) {
    console.error(err);
    let error = new Error();
    error.message = "Failed to verify user.";
    error.status = 403;
    throw error;
  }
};

/**
 * Update the number of comments for the provided feedbackId
 */
const updateNumComments = async (feedbackId) => {
  // important typecast, $match will not return results when provided a string
  const idToSearch = Mongoose.Types.ObjectId(feedbackId);

  // get number of comments
  await Project.aggregate([
    { $match: { _id: idToSearch } },
    { $project: { commentsCount: { $size: "$comments" } } },
  ]).exec(async (err, results) => {
    const numComments = results[0].commentsCount;
    try {
      // set number of comments to commentsCount
      await Project.updateOne(
        { _id: idToSearch },
        { $set: { commentsCount: numComments } }
      );
    } catch (err) {
      console.log(err);
      const error = new Error();
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        error.message = `Could not find any Feedback Request with id ${idToSearch}.`;
        error.status = 404;
      } else {
        error.message = "Failed to update comment count.";
        error.status = 500;
      }
      throw error;
    }
  });
};
