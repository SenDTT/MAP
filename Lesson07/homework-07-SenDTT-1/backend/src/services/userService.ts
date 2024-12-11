import bcrypt from "bcryptjs";
import { ISignupBody } from "../types/authTypes";
import { User, UserModel } from "../schema";

const salt = 10;

export const getAllUsers = async () => {
  try {
    const results: any = await UserModel.find();
    return results.length > 0 ? results : null;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user: User | null = await UserModel.findById(id).select("-password");
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user: User | null = await UserModel.findOne({ email });
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
};

export const addNewUser = async (data: ISignupBody) => {
  let { password } = data;
  const hash = bcrypt.hashSync(password, salt);

  try {
    const user: User | null = await UserModel.create({
      ...data,
      password: hash,
    });

    return user;
  } catch (error) {
    console.error("Error add user:", error);
    throw error;
  }
};
