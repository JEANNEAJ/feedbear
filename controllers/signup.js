import passport from "passport";

export const signup = async (req, res, next) => {
  passport.authenticate("signup", async (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      console.log("no user");
      return next(err);
    }

    const { _id, email, name } = user;
    return res.status(200).json({ data: { _id, email, name } });
  })(req, res, next);
};
