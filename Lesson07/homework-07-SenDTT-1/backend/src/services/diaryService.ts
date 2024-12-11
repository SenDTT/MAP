import { Schema } from "mongoose";
import { Diary, DiaryModel } from "../schema";

export const createDiary = async (
  data: Pick<Diary, "title" | "description" | "user_id">
) => {
  const newDiary = await DiaryModel.create(data);

  return newDiary;
};

export const queryAllDiaries = async (
  user_id: Schema.Types.ObjectId,
  limit: number,
  page: number
) => {
  const data = await DiaryModel.find({ user_id })
    .limit(limit)
    .skip((page - 1) * limit);

  return data;
};

export const queryDiaryById = async (
  user_id: Schema.Types.ObjectId,
  id: string
) => {
  const data = await DiaryModel.findOne({ user_id, _id: id });

  return data;
};

export const finadAndUpdateDiary = async (
  user_id: Schema.Types.ObjectId,
  id: string,
  body: Pick<Diary, "title" | "description">
) => {
  const data = await DiaryModel.updateOne({ user_id, _id: id }, { $set: body });

  return data;
};

export const finadAndDeleteDiary = async (
  user_id: Schema.Types.ObjectId,
  id: string
) => {
  const data = await DiaryModel.deleteOne({ user_id, _id: id });

  return data;
};
