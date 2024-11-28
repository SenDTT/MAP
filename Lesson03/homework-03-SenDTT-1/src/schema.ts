import { Schema, model, InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    location: { type: [Number], required: false },
    hobbies: { type: [String], required: false },
  },
  { versionKey: false }
);

userSchema.index({ location: "2d" });

const fileSchema = new Schema({
  originalname: { type: String, required: true },
  mimetype: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
});

const questionSchema = new Schema({
  question: { type: String, required: true },
  due_date: { type: Number, default: () => Date.now() + 86400000 },
});

const lectureSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  files: [fileSchema],
  questions: [questionSchema],
});

const courseSchema = new Schema(
  {
    code: { type: String, required: true },
    title: { type: String, required: true },
    created_by: {
      user_id: Schema.Types.ObjectId,
      fullname: String,
      email: String,
    },
    lectures: [lectureSchema],
  },
  { versionKey: false }
);

export type User = InferSchemaType<typeof userSchema>;
export type Course = InferSchemaType<typeof courseSchema>;
export type Lecture = InferSchemaType<typeof lectureSchema>;
export type File = InferSchemaType<typeof fileSchema>;
export type Question = InferSchemaType<typeof questionSchema>;

export const UserModel = model<User>("user", userSchema);
export const CourseModel = model<Course>("course", courseSchema);
