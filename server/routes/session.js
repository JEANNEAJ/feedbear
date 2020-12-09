import express from "express";
import { checkLoggedIn, logout } from "../controllers/session.js";

const router = express.Router();

router.get("/session", checkLoggedIn);
router.delete("/session", logout);

export default router;
