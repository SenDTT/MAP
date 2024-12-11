import { RequestHandler } from "express";
import {
  createDiary,
  finadAndDeleteDiary,
  finadAndUpdateDiary,
  queryAllDiaries,
  queryDiaryById,
} from "../services/diaryService";
import { IResponseData } from "../types/common";
import { Diary } from "../schema";

export const createNewDiary: RequestHandler<
  unknown,
  IResponseData,
  Pick<Diary, "title" | "description">
> = async (req, res, next) => {
  try {
    if (req.user) {
      const diary = await createDiary({ ...req.body, user_id: req.user._id });
      res.json({ success: true, data: diary });
    }

    next(new Error("Unauthorized"));
  } catch (error) {
    next(error);
  }
};

export const getAllDiaries: RequestHandler<
  unknown,
  IResponseData,
  unknown,
  { limit: number; page: number }
> = async (req, res, next) => {
  try {
    const { limit, page } = req.query;
    if (req.user) {
      const data = await queryAllDiaries(req.user._id, limit, page);
      res.json({ success: true, data });
    }

    next(new Error("Unauthorized"));
  } catch (error) {
    next(error);
  }
};

export const getADiary: RequestHandler<{ id: string }, IResponseData> = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    if (req.user) {
      const data = await queryDiaryById(req.user._id, id);
      res.json({ success: true, data });
    }

    next(new Error("Unauthorized"));
  } catch (error) {
    next(error);
  }
};

export const updateDiary: RequestHandler<
  { id: string },
  IResponseData,
  Pick<Diary, "title" | "description">
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user) {
      const data = await finadAndUpdateDiary(req.user._id, id, req.body);
      res.json({ success: true, data });
    }

    next(new Error("Unauthorized"));
  } catch (error) {
    next(error);
  }
};

export const deleteDiary: RequestHandler<
  { id: string },
  IResponseData
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user) {
      const data = await finadAndDeleteDiary(req.user._id, id);
      res.json({ success: true, data });
    }

    next(new Error("Unauthorized"));
  } catch (error) {
    next(error);
  }
};
