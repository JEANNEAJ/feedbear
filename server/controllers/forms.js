import Mongoose from "mongoose";
import { uploadImage } from "../helpers/helpers.js";
import FormMessage from "../models/formMessage.js";

export const getForms = async (req, res) => {
  try {
    const formMessages = await FormMessage.find();
    res.status(200).json(formMessages);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export const getFormByID = async (req, res) => {
  const { id } = req.params;
  const { type } = req.query;
  // if (!type.length) type = "_id";

  // console.log(req);
  // console.log('getFormByID:', id);
  console.log(type);
  try {
    const formMessages = await FormMessage.find({ [type]: id });
    res.status(200).json(formMessages);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export const createForm = async (req, res) => {
  const body = req.body;
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

export const updateForm = async (req, res) => {
  const { id: _id } = req.params;
  const form = req.body;

  if (!Mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No form found with that id");
  }

  try {
    const updatedForm = await FormMessage.findByIdAndUpdate(
      _id,
      { ...form, _id },
      { new: true }
    );
    return res.status(200).json(updatedForm);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const deleteForm = async (req, res) => {
  const { id: _id } = req.params;
  try {
    await FormMessage.deleteOne({ _id });
    res.status(204);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
