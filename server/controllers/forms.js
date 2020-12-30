import Mongoose from "mongoose";
import { deleteImage, uploadImage } from "../helpers/helpers.js";
import FormMessage from "../models/formMessage.js";

export const getForms = async (req, res) => {
  const { numResults, sortBy, sortDirection, last } = req.query;

  try {
    /** The date of the last item (current date if none provided) */
    let lastDate;
    if (!last.length) lastDate = new Date();
    else {
      const dateObj = await FormMessage.find({ _id: last }, { createdAt: 1 });
      lastDate = dateObj[0].createdAt;
    }
    // TODO if requested item is deleted during this operation, will result in error - will need to send response to client requesting the next _id up to try again

    const searchDirection = parseInt(sortDirection) === -1 ? "$lte" : "$gte";
    const searchQuery = !last.length
      ? {}
      : { createdAt: { [searchDirection]: lastDate } };

    const formMessages = await FormMessage.find(searchQuery, { comments: 0 })
      .sort({ createdAt: sortDirection })

      .limit(parseInt(numResults));

    res.status(200).json(formMessages);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err });
  }
};

export const getFormByID = async (req, res) => {
  const { id } = req.params;
  const { type } = req.query;

  try {
    const formMessages = await FormMessage.find({ [type]: id });
    res.status(200).json(formMessages);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export const createForm = async (req, res) => {
  const body = req.body;
  body.userId = req.session.user._id;
  console.log(body);

  // if a file was included, upload to GCS and store the URL
  try {
    console.log(req.file);
    if (req.file) {
      const fileURL = await uploadImage(req.file);
      body.file = fileURL;
    }
  } catch (error) {
    throw new Error("file upload failed, feedback request was not created");
  }

  const newForm = new FormMessage(body);

  try {
    await newForm.save();
    res.status(201).json(newForm);
  } catch (err) {
    res.status(409).json({ message: err });
  }
};

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
