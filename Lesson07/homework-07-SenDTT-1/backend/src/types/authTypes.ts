import { UserSchemaType } from "../schema";
import { IResponseData } from "./common";

export type UserRespose = UserSchemaType & { id: string };

export interface ILoginReponse extends IResponseData {
  data: {
    user: Omit<UserRespose, "password">;
  };
}

export interface ISignupReponse extends IResponseData {
  data: UserRespose | null;
}

export interface ISignupBody {
  email: string;
  fullname: string;
  password: string;
}
