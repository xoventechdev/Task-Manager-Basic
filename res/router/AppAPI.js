import { Router } from "express";
import {
  emailVerify,
  emailVerifyRequest,
  getUserProfile,
  passwordForgot,
  passwordReset,
  userProfileUpdate,
  userSignIn,
  userSignUp,
} from "../controllers/user/UserController.js";
import { verifyToken } from "../middleware/Auth.js";

const router = Router();

router.post("/signup", userSignUp);
router.post("/signin", userSignIn);
router.post("/emailVerify", emailVerify);
router.post("/passwordForgot", passwordForgot);
router.post("/passwordReset", passwordReset);
router.post("/userProfileUpdate/:id", verifyToken, userProfileUpdate);
router.post("/emailVerifyRequest", emailVerifyRequest);
router.get("/getUserProfile/:id", verifyToken, getUserProfile);

export default router;
