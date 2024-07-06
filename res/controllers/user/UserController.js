import { UserModel } from "../../models/user/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OTPModel } from "../../models/user/OTPModel.js";
import {
  passwordResetSuccessfully,
  sendPasswordResetEmail,
} from "../../helper/MailServices.js";

export const userSignUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(200).json({
        status: "error",
        response: "Please provide all the required fields",
      });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .json({ status: "warning", response: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;

    const user = new UserModel(req.body);

    await user.save();

    res.status(201).json({
      status: "success",
      response: "User created successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      response: err.message,
    });
  }
};

export const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        status: "error",
        response: "Please provide all the required fields",
      });
    }

    // Check for existing user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({
        status: "error",
        response: "The user does not exist. Please create your account.",
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        status: "error",
        response: "Invalid password. Please try with your valid password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("userId", user._id, {
      httpOnly: false,
      secure: false,
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      token,
      response: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        mobile: user.mobile,
        photo: user.photo,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      response: err.message,
    });
  }
};

export const userProfileUpdate = async (req, res) => {
  try {
    const email = req.email;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    await UserModel.updateOne({ email: email }, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      response: "User profile updated successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", response: err.message });
  }
};

export const userProfileInfo = async (req, res) => {
  try {
    const email = req.email;
    const user = await UserModel.aggregate([
      { $match: { email: email } },
      {
        $project: {
          password: 0,
        },
      },
    ]);
    if (user) {
      return res.status(200).json({ status: "success", response: user[0] });
    } else {
      return res
        .status(200)
        .json({ status: "error", response: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", response: err.message });
  }
};

export const PasswordResetOTPRequest = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res
        .status(200)
        .json({ status: "warning", response: "User not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 90000);
    await OTPModel.create({ email: email, otp: otp });
    const successOTP = await sendPasswordResetEmail(email, otp);
    if (successOTP) {
      return res.status(200).json({
        status: "success",
        response: "OTP sent successfully to your registered email address",
      });
    } else {
      return res.status(200).json({
        status: "warning",
        response: "Failed to send OTP. Please try again later.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", response: err.message });
  }
};

export const OTPVerifyRequest = async (req, res) => {
  try {
    const { email, otp } = req.params;
    const otpRecord = await OTPModel.findOne({
      email: email,
      otp: otp,
      isUsed: 0,
    });
    if (!otpRecord) {
      return res.status(200).json({
        status: "warning",
        response: "Invalid OTP. Please try again.",
      });
    }

    otpRecord.isUsed = 1;
    await otpRecord.save();
    res
      .status(200)
      .json({ status: "success", response: "OTP verified successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", response: err.message });
  }
};

export const PasswordResetRequest = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    const user = await OTPModel.findOne({ email: email, otp: otp, isUsed: 1 });
    if (!user) {
      return res.status(200).json({
        status: "warning",
        response: "User not found with matched otp.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.updateOne({ email: email }, { password: hashedPassword });
    await OTPModel.deleteMany({ email: email });
    await passwordResetSuccessfully(email);
    res
      .status(200)
      .json({ status: "success", response: "Password reset successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", response: err.message });
  }
};
