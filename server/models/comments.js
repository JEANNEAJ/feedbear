import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  comment: {
    type: String,
    required: true
  }
}, { timestamps: true });

const feedbackCommentsSchema = mongoose.Schema({
  comments: {
    type: [commentSchema],
    default: []
  }
}, { timestamps: true });

export const Comment = mongoose.model("comment", commentSchema);
const FeedbackComments = mongoose.model("feedbackComments", feedbackCommentsSchema);

export default FeedbackComments;
