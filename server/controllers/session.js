export const checkLoggedIn = (req, res) => {
  const user = req.session.user;
  // if cookie with user info is passed to route it will return the user
  // otherwise returns undefined
  return res.send({ data: user });
};

export const logout = ({ session }, res) => {
  try {
    const user = session.user;
    if (user) {
      // remove session from DB and tell browser to delete cookie
      session.destroy((err) => {
        if (err) throw err;
        res.clearCookie(process.env.SESS_NAME);
        res.sendStatus(204);
      });
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    // 422: unprocessable entity
    res.status(422).send({ err });
  }
};
