import { RequestHandler } from "express";
import validator from "validator";
import { IErrorResponse, IResponseData } from "../types/common";
import { ISignupBody } from "../types/authTypes";
import { User } from "../schema";
import { getUserByEmail, getUserById } from "../services/userService";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const authenticate: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as {
      id: string;
    };
    const user = await getUserById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
  } catch (error) {
    next(error);
  }
};

export const login_validator: RequestHandler<
  unknown,
  IErrorResponse | IResponseData,
  { email: string; password: string }
> = async (req, res, next) => {
  const { email, password } = req.body;
  if (validator.isEmpty(email)) {
    res
      .status(400)
      .json({ success: false, message: "Email must be required!" });
    return;
  }
  if (validator.isEmpty(password)) {
    res
      .status(400)
      .json({ success: false, message: "Password must be required!" });
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(400).json({ success: false, message: "Email is invalid!" });
    return;
  }

  const person: User | null = await getUserByEmail(email);
  if (!person) {
    res.status(400).json({ success: false, message: "Email does not exist." });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({
      success: false,
      message: "Password must be greater than or equal 6 characters.",
    });
    return;
  }

  const match = await bcrypt.compare(password, person.password as string);

  if (!match) {
    res.status(400).json({ success: false, message: "Password is incorrect." });
    return;
  }
  next();
};

export const signup_validator: RequestHandler<
  unknown,
  IErrorResponse | IResponseData,
  ISignupBody
> = async (req, res, next) => {
  const { email, password, fullname } = req.body;
  if (validator.isEmpty(email)) {
    res
      .status(400)
      .json({ success: false, message: "Email must be required!" });
    return;
  }
  if (validator.isEmpty(password)) {
    res
      .status(400)
      .json({ success: false, message: "Password must be required!" });
    return;
  }
  if (validator.isEmpty(fullname)) {
    res
      .status(400)
      .json({ success: false, message: "Fullname must be required!" });
    return;
  }
  if (!validator.isEmail(email)) {
    res.status(400).json({ success: false, message: "Email is invalid!" });
    return;
  }

  const person: User | null = await getUserByEmail(email);
  if (person) {
    res.status(400).json({ success: false, message: "Email is existed." });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({
      success: false,
      message: "Password must be greater than or equal 6 characters.",
    });
    return;
  }
  next();
};
