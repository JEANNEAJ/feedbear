import express from "express";
import { getUserName, deleteUser } from '../controllers/user.js';
import requireLogin from "../helpers/sessionChecker.js";

const router = express.Router();

router.get('/users/:userId', getUserName);
router.delete('/users/:userId', requireLogin, deleteUser);

export default router;
