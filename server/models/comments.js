import mongoose from "mongoose";

export const commentSchema = mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'User',
  },
  comment: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Comment = mongoose.model("comment", commentSchema);

export default Comment;