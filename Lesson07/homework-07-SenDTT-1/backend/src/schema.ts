import { Schema, model, InferSchemaType, pluralize } from "mongoose";

pluralize(null);

const userSchema = new Schema({
  fullname: String,
  email: { type: String, unique: true },
  password: String,
  picture_url: String,
});

const diarySchema = new Schema(
  {
    user_id: Schema.Types.ObjectId,
    title: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

export type UserSchemaType = InferSchemaType<typeof userSchema>;
export type User = UserSchemaType & { _id: Schema.Types.ObjectId };
export type Diary = InferSchemaType<typeof diarySchema>;

export const DiaryModel = model<Diary>("diary", diarySchema);
export const UserModel = model<User>("user", userSchema);
