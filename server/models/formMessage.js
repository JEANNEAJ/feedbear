import mongoose from "mongoose";

const formSchema = mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  name: String,
  message: String,
  projectTitle: String,
  projectLink: {
    type: String,
    required: true,
  },
  liveLink: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const FormMessage = mongoose.model("FormMessage", formSchema);

export default FormMessage;
