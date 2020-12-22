const sessionChecker = (req, res, next) => {
  if (!req.session.user) {
    let err = new Error("You must log in to access this route.");
    err.status = 401;
    next(err);
  } else {
    next();
  }
};

export default sessionChecker;
