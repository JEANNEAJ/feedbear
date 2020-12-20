import { uploadImage } from "../helpers/helpers.js";
import FormMessage from "../models/formMessage.js";

export const getForms = async (req, res) => {
  const { numResults, sortBy, last } = req.query;
  // console.log(numResults, sortBy, last);
  try {
    /** The date of the last item (current date if none provided) */
    let lastDate; 
    if (!last.length) lastDate = new Date();
    else {
      const dateObj = await FormMessage.find({ _id: last }, { createdAt: 1 });
      lastDate = dateObj[0].createdAt;
    } 

    // const query = {};
    // if (lastDate) query.lastDate = { $lt: ISODate(lastDate) };

    const formMessages = await FormMessage.find({
      createdAt: { $lte: lastDate }
      })
      .sort({ createdAt: -1 })
      .limit(parseInt(numResults));
      // console.log(formMessages);
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
