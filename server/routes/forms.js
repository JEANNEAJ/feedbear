import express from "express";

import { getForms, getFormByID, createForm } from "../controllers/forms.js";
import {
  updateFeedbackDetails,
  deleteFeedbackRequest,
} from "../controllers/editingFeedback.js";
import multer from "../helpers/multerMiddleware.js";
import requireLogin from "../helpers/sessionChecker.js";

const router = express.Router();

// get all forms
router.get("/", getForms);

// get form by ID
router.get("/:id", getFormByID);

// create new form
router.post("/", requireLogin, multer.single("file"), createForm);

//update
router.patch(
  "/:id",
  requireLogin,
  multer.single("file"),
  updateFeedbackDetails
);

//delete
router.delete("/:id", requireLogin, deleteFeedbackRequest);

export default router;
