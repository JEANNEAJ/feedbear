import express from "express";
import multer from "../helpers/multerMiddleware.js";

import { signup } from "../controllers/signup.js";
import { login } from "../controllers/login.js";

const router = express.Router();

router.post("/signup", multer.single("file"), signup);
router.post("/login", login);

export default router;
