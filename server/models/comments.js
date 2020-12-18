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

const feedbackCommentsSchema = mongoose.Schema({
  comments: {
    type: [commentSchema],
    default: []
  }
}, { timestamps: true });

export const Comment = mongoose.model("comment", commentSchema);
const FeedbackComments = mongoose.model("feedbackComments", feedbackCommentsSchema);

export default FeedbackComments;
