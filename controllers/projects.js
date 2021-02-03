import Mongoose from "mongoose";
import { deleteImage, uploadImage } from "../helpers/helpers.js";
import Project from "../models/projects.js";

export const getProjects = async (req, res) => {
  const { numResults, sortBy, sortDirection, last, idType, id } = req.query;

  try {
    /** The date of the last item (current date if none provided) */
    let lastDate;
    if (!last.length) lastDate = new Date();
    else {
      const dateObj = await Project.find({ _id: last }, { createdAt: 1 });
      lastDate = dateObj[0].createdAt;
    }
    // TODO if requested item is deleted during this operation, will result in error - will need to send response to client requesting the next _id up to try again

    const searchDirection = parseInt(sortDirection) === -1 ? "$lte" : "$gte";
    const searchQuery = !last.length
      ? !idType
        ? {}
        : { [idType]: id }
      : !idType
      ? { createdAt: { [searchDirection]: lastDate } }
      : { createdAt: { [searchDirection]: lastDate }, [idType]: id };

    const projects = await Project.find(searchQuery, { comments: 0 })
      .populate("userId", { name: 1, avatar: 1 })
      .sort({ createdAt: sortDirection })
      .limit(parseInt(numResults));

    res.status(200).json(projects);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err });
  }
};

export const getProjectByID = async (req, res) => {
  const { id } = req.params;
  const { type } = req.query;

  try {
    const projects = await Project.find({ [type]: id });
    res.status(200).json(projects);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

export const createProject = async (req, res, next) => {
  const body = req.body;
  body.userId = req.session.user._id;

  // if a file was included, upload to GCS and store the URL
  try {
    if (req.file) {
      const fileURL = await uploadImage(req.file);
      body.file = fileURL;
    }
  } catch (error) {
    return next(new Error("file upload failed, project was not created"));
  }

  const newProject = new Project(body);

  try {
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(409).json({ message: err });
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const { id: _id } = req.params;
    const body = req.body;

    // retrieve the project corresponding to _id
    const project = await Project.findById(_id);
    if (!project) return res.status(404).send(`No post with ID ${_id} exists.`);

    // verify that the user owns this document
    if (project.userId != userId) {
      // TODO: convert to generic 403 error type
      return res
        .status(403)
        .send("Permission denied: you do not own this resource.");
    }

    // if an existing file was removed in the update, delete the file
    const fileWasRemoved = project.file && !body.file;
    const fileWasReplaced = project.file && req.file;
    if (fileWasRemoved || fileWasReplaced) {
      await deleteImage(project.file);
      body.file = null;
    }

    // if body.file exists but doesn't match the existing URL, remove it! XSS risk
    if (body.file && body.file !== project.file) delete body.file;

    // if a new file was attached, upload it to storage
    if (req.file) {
      const fileURL = await uploadImage(req.file);
      body.file = fileURL;
    }

    const result = await Project.findByIdAndUpdate(_id, body, {
      new: true,
    });
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};

export const deleteProject = async (req, res) => {
  const userId = req.session.user._id;
  const { id: _id } = req.params;

  if (!Mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");
  else {
    try {
      const project = await Project.findById(_id);
      // verify that the user owns this document
      if (project.userId != userId) {
        // TODO: convert to generic 403 error type
        return res
          .status(403)
          .send("Permission denied: you do not own this resource.");
      }

      await Project.findByIdAndRemove(_id);
      res.json({ message: "Project deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
};
