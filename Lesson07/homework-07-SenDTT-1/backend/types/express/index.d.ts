import { User } from "../../src/schema";

declare global {
  namespace Express {
    interface Request {
      user?: Omit<User, "password"> & { _id: Schema.type.ObjectId };
    }
  }
}
