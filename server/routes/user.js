import express from "express";
import { getUserName } from '../controllers/user.js';

const router = express.Router();

router.get('/users/:userId', getUserName);

export default router;
