import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: [3 , "Username must be at least 3 characters long"],
    maxlength: [30, "Username can't be longer than 30 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/, "Please fill a valid email address"],
  },
  hashedPassword: {
    type: String,
    required: true,
    trim: true,
    minlength: [6, "Password must be at least 6 characters long"],
    maxlength: [40, "Password can't be longer than 30 characters"],
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true, strictQuery: true }, 
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;