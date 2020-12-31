import express from "express";
import {
  getComments,
  createComment,
  editComment,
  deleteComment,
} from "../controllers/comments.js";
import requireLogin from "../helpers/sessionChecker.js";

const router = express.Router();

router.get("/comments/:projectId", getComments);

router.post("/comments/:projectId", requireLogin, createComment);

//update
router.patch("/comments/:projectId/:commentId", requireLogin, editComment);

//delete
router.delete("/comments/:projectId/:commentId", requireLogin, deleteComment);

export default router;
