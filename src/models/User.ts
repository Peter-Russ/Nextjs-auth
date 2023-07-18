import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"], 
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
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  verifiedEmail: {
    type: Boolean,
    default: false,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpires: Date,
  verificationToken: String,
  verificationTokenExpires: Date,
  
}, { timestamps: true, strictQuery: true }, 
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;