import User from '../models/users.js';

export const getUserName = async (req, res) => {
  const { userId } = req.params;

  try {
    const userName = await User.find({ _id: userId }, { name: 1, _id: 0 })
    res.status(201).json(userName);
  } catch (err) {
    res.status(404).json({ message: err });
  }
}
