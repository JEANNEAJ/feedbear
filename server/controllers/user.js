import User from '../models/users.js';

export const getUserName = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const userName = await User.find({ _id: userId }, { name: 1, _id: 0 })
    
    if (!userName[0]) {
      throw {
        status: 404,
        message: "User does not exist"
      }
    }
    
    res.status(200).json(userName);
  } catch (err) {
    return next(err)
  }
}

export const deleteUser = async (req, res, next) => {
  const { userId } = req.params
  
  if (userId !== req.session.user._id) {
    throw {
      status: 401,
      message: "Permission denied: you do not own this resource."
    }
  }
  
  try {
    const user = await User.findById(userId)

    if (user) {
      await User.findByIdAndDelete(userId)
      res.status(200).json({ data: { id: userId } })
    } else {
      throw {
        status: 404,
        message: "User does not exist"
      }
    }

  } catch (error) {
    return next(error)
  }
}