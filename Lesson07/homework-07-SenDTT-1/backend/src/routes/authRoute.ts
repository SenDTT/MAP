import { Router } from "express";
import {
  loginController,
  signupController,
} from "../controller/authController";
import {
  login_validator,
  signup_validator,
} from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", login_validator, loginController);
router.post("/signup", signup_validator, signupController);

export default router;
