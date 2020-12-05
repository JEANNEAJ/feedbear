import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// adding new user; Passport authenticates the user based on the middleware created in auth.js
router.post("/signup", async (req, res, next) => {
  passport.authenticate("signup", async (err, user, info) => {
    if (err) {
      return next(err);
    }

    const { _id, email, name } = req.user;
    return res.status(200).json({ data: { _id, email, name } });
  })(req, res, next);
});

// authenticating existing user login
router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (!user) {
        return res.status(401).send({ message: "Login failed." });
      }

      if (err) {
        const error = new Error("An error occurred.");
        return next(error);
      }

      // generates token for existing user
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email, name: user.name };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

        return res.json({ data: body, token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

export default router;
