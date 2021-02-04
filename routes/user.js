import express from "express";
import { getUserInfo, deleteUser } from '../controllers/user.js';
import requireLogin from "../helpers/sessionChecker.js";

const router = express.Router();

router.get('/users/:userId', getUserInfo);
// router.get('/users/projects/:userId', getUserProjectCount);
router.delete('/users/:userId', requireLogin, deleteUser);

export default router;
