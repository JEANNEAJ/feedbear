import express from "express";
import {
  getComments,
  createComment,
  editComment,
  deleteComment,
} from "../controllers/comments.js";
import requireLogin from "../helpers/sessionChecker.js";

const router = express.Router();

router.get("/comments/:feedbackId", getComments);

router.post("/comments/:feedbackId", requireLogin, createComment);

//update
router.patch("/comments/:feedbackId/:commentId", requireLogin, editComment);

//delete
router.delete("/comments/:feedbackId/:commentId", requireLogin, deleteComment);

export default router;
