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
    // TODO if requested item is deleted during this operation, will result in error - will need to send response to client requesting the next _id up to try again

    const searchDirection = parseInt(sortDirection) === -1 ? '$lte' : '$gte';
    const searchQuery = !last.length ? {} : { createdAt: { [searchDirection]: lastDate } };
    
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
