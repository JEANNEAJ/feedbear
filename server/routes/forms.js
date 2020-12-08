import express from "express";

import { getForms, getFormByID, createForm } from "../controllers/forms.js";

const router = express.Router();

// get all forms
router.get("/", getForms);

// get form by ID
router.get("/:id", getFormByID);

// get forms by user ID
// router.get('/:userId', getFormsByUserId);

// create new form
router.post("/", createForm);

//update
router.patch("/:id", updateFeedbackDetails);

//delete
router.delete("/:id", () => {});

export default router;
