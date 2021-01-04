import express from "express";

import {
  getProjects,
  getProjectByID,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projects.js";
import multer from "../helpers/multerMiddleware.js";
import requireLogin from "../helpers/sessionChecker.js";

const router = express.Router();

// get all projects
router.get("/", getProjects);

// get project by ID
router.get("/:id", getProjectByID);

// create new project
router.post("/", requireLogin, multer.single("file"), createProject);

//update
router.patch("/:id", requireLogin, multer.single("file"), updateProject);

//delete
router.delete("/:id", requireLogin, deleteProject);

export default router;
