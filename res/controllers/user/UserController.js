import { UserModel } from "../../models/user/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userSignUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        status: "error",
        response: "Please provide all the required fields",
      });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
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
      maxAge: 1000 * 60 * 60,
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
