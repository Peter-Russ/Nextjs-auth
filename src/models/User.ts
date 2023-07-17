import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
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