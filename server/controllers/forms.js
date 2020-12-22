import { uploadImage } from "../helpers/helpers.js";
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

    const searchDirection = parseInt(sortDirection) === -1 ? '$lt' : '$gt';
    const searchQuery = !last.length ? {} : { createdAt: { [searchDirection]: lastDate } };
    
    const formMessages = await FormMessage.find(searchQuery)
      .sort({ createdAt: sortDirection })
      .limit(parseInt(numResults));

    //Note: sort by date might skip some if they have the EXACT same date and are in between pages - need to implement some kind of checking to make sure not skipping any (maybe grab less than or equal to, then exclude ones already in array)

    // if deleted will throw error

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
