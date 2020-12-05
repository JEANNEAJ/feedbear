import express from "express";

import { signup } from "../controllers/signup.js";
import { login } from "../controllers/login.js";

const router = express.Router();

// adding new user; Passport authenticates the user based on the middleware created in auth.js
router.post("/signup", signup);

// authenticating existing user login
router.post("/login", login);

export default router;
