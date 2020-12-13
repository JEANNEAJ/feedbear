import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },

  comment: {
    type: String,
    required: true
  }
});

const projectComment = mongoose.model("projectComment", commentSchema);

export default projectComment;
