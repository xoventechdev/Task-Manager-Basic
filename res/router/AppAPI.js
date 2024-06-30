import { Router } from "express";
import {
  userProfileUpdate,
  userSignIn,
  userSignUp,
} from "../controllers/user/UserController.js";
import { verifyToken } from "../middleware/Auth.js";
import {
  allTaskList,
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

router.post("/createTask", verifyToken, createTask);
router.get("/allTaskList", verifyToken, allTaskList);
router.get("/updateTaskStatus/:id/:status", verifyToken, updateTaskStatus);
router.delete("/deleteTask/:id", verifyToken, deleteTask);
router.get("/listTaskByStatus/:status", verifyToken, listTaskByStatus);
router.get("/countTaskByStatus", verifyToken, countTaskByStatus);

export default router;
