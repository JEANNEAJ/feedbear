import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/.test(v);
      },
      message: "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number"
    },
    minlength: [8, "Password must be at least 8 characters"]
  },
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

const User = mongoose.model("User", userSchema);

export default User;
