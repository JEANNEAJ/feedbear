import passport from "passport";

export const signup = async (req, res, next) => {
  passport.authenticate("signup", async (err, user, info) => {

    try {
      if (err) {
        return next(err);
      }
  
      if (!user) {
        console.log("no user");
        return next(err);
      }
  
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
  
        req.session.user = user; // stores user session
      });
      
      return res.json({ data: user });

    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};
