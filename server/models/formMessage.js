import mongoose from "mongoose";
import { commentSchema } from './comments.js';

const formSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    name: String,
    message: String,
    projectTitle: String,
    projectLink: {
      type: String,
      required: true,
    },
    liveLink: String,
    file: {
      type: String,
      default: null,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    comments: [commentSchema],
    numComments: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

const FormMessage = mongoose.model("FormMessage", formSchema);

export default FormMessage;
