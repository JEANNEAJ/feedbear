import passport from "passport";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
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

        req.session.user = body; // stores user session

        return res.json({ data: body, token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};
