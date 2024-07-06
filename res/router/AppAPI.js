import { Router } from "express";
import {
  OTPVerifyRequest,
  PasswordResetOTPRequest,
  PasswordResetRequest,
  userProfileInfo,
  userProfileUpdate,
  userSignIn,
  userSignUp,
} from "../controllers/user/UserController.js";
import { verifyToken } from "../middleware/Auth.js";
import {
  countTaskByStatus,
  createTask,
  deleteTask,
  listTaskByStatus,
  updateTaskStatus,
} from "../controllers/task/TaskController.js";

const router = new Router();

//User Router
router.post("/userSignUp", userSignUp);
router.post("/userSignIn", userSignIn);
router.post("/userProfileUpdate", verifyToken, userProfileUpdate);
router.get("/userProfile", verifyToken, userProfileInfo);

router.get("/passwordResetOTPRequest/:email", PasswordResetOTPRequest);
router.get("/passwordOTPVerify/:email/:otp", OTPVerifyRequest);
router.post("/passwordResetRequest", PasswordResetRequest);

router.post("/createTask", verifyToken, createTask);
router.get("/updateTaskStatus/:id/:status", verifyToken, updateTaskStatus);
router.delete("/deleteTask/:id", verifyToken, deleteTask);
router.get("/listTaskByStatus/:status", verifyToken, listTaskByStatus);
router.get("/countTaskByStatus", verifyToken, countTaskByStatus);

export default router;
