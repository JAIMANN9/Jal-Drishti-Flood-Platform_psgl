import express from "express";
import {
  registerUser,
  loginUser,
  LogoutUser,
  isAuthUser,
} from "../controllers/User.controller.js";
import {authUser} from "../middlewares/auth.User.js";
// import {loginUser} from "../controllers/User.controller.js";
// import {LogoutUser} from "../controllers/User.controller.js";

const router = express.Router();
// Register User
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout",authUser, LogoutUser);
router.get("/is-auth",authUser, isAuthUser);

export default router;
