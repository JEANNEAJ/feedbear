import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Project from './projects.js'

const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: "Please enter a valid e-mail",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/.test(v);
      },
      message:
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
    },
    minlength: [8, "Password must be at least 8 characters"],
  },
  avatar: String,
});

// hashing the user password to be stored safely
userSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  console.log("did login comparison:", compare);
  return compare;
};

userSchema.methods.getProjectCount = async function() {
  const projects = await Project.find({ userId: this._id})

  return projects.length
}

const User = mongoose.model("User", userSchema);

export default User;
