import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  isUsed: {
    type: Number,
    default: 0,
  },
});

export const OTPModel = mongoose.model("otp", OTPSchema);
