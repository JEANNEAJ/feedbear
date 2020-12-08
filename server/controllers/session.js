export const checkLoggedIn = ((req, res) => {
  const user = req.session.user;
  // if cookie with user info is passed to route it will return the user
  // otherwise returns undefined
  return res.send({ data: user });
});