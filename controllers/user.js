import User from '../models/users.js';
import Mongoose from 'mongoose'

// export const getUserProjectCount = async (req, res, next) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId).select({ _id: 1, name: 1, projectCount: 1})

//     if (!user) {
//       throw {
//         status: 404,
//         message: "User does not exist"
//       }
//     }



//     const projectCount = await user.getProjectCount()
    
//     res.status(200).json({ userId: user._id, name: user.name , projectCount });
//   } catch (err) {
//     return next(err)
//   }
// }


export const getUserInfo = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select({ _id: 1, name: 1})
    
    if (!user) {
      throw {
        status: 404,
        message: "User does not exist"
      }
    }
    const projectCount = await user.getProjectCount()
    
    res.status(200).json({ userId: user._id, name: user.name , projectCount });
  } catch (err) {
    return next(err)
  }
}

export const deleteUser = async (req, res, next) => {
  const { userId } = req.params
  
  
  try {
    
    if (userId !== req.session.user._id) {
      throw {
        status: 401,
        message: "Permission denied: you do not own this resource."
      }
    }

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