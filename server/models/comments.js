import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  // userId: {
  //   type: mongoose.SchemaTypes.ObjectId,
  //   required: true,
  // },
  comment: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Comment = mongoose.model("comment", commentSchema);

export default Comment;
