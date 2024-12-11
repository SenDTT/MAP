import { RequestHandler } from "express";
import { addNewUser, getUserByEmail } from "../services/userService";
import { ILoginReponse, ISignupBody } from "../types/authTypes";
import { IErrorResponse, IResponseData } from "../types/common";
import { User } from "../schema";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const loginController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse,
  { email: string; password: string }
> = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password as string))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        _id: user._id.toString(),
        email: user.email,
        fullname: user.fullname,
        picture_url: user.picture_url,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );
    res.json({
      success: true,
      data: { token },
    });
    return;
  } catch (error) {
    next(error);
  }

  next(new Error("Error"));
};

export const signupController: RequestHandler<
  unknown,
  ILoginReponse | IErrorResponse,
  ISignupBody
> = async (req, res, next) => {
  const { email, fullname, password } = req.body;

  try {
    const person: User = await addNewUser({
      email,
      fullname,
      password,
    });

    res.json({
      success: true,
      data: {
        user: {
          id: person._id.toString(),
          email: person.email,
          fullname: person.fullname,
          picture_url: person.picture_url || "",
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
