import express from 'express';
import { getComments, createComment } from '../controllers/comments.js';

const router = express.Router();

router.get('/comments/:feedbackId', getComments);

router.post("/comments/:feedbackId", createComment);

//update
// router.patch("/comments/:feedbackId/:commentId", editComment);

//delete
// router.delete("/comments/:feedbackId/:commentId", deleteComment);

export default router;
