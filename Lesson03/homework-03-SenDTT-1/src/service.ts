import mongoose from "mongoose";
import {
  Course,
  CourseModel,
  Lecture,
  Question,
  User,
  UserModel,
} from "./schema";

// Create a function to add a new user with (fullname, email, password, and location with the following value [-91.96731488465576, 41.018654231616374])
export const addNewUser = async (user: User) => {
  const data = await UserModel.create(user);

  console.log("add new user: " + data._id);

  return data;
};

export const getUserById = async (_id: string) => {
  const data = UserModel.findById(_id);

  return data;
};

// Create a function to add a new course with (code, title). Use the output of the previous function to fill out the created_by properties (prefixed hard-coded values).
export const addNewCourse = async (course: Omit<Course, "lectures">) => {
  const data = await CourseModel.create(course);

  console.log("add new course: " + data.code);

  return data;
};

export const getCourseByCode = async (code: string) => {
  const data = CourseModel.findOne({ code });

  return data;
};

// Create a function to add a new lecture with (title, description).
export const addNewLecture = async (
  code: string,
  lecture: Omit<Lecture, "questions" | "files">
) => {
  const data = await CourseModel.updateOne(
    { code },
    { $addToSet: { lectures: lecture } }
  );

  if (data.modifiedCount) {
    console.log("add new lecture");
    return;
  }

  console.log("Add new lecture failed", data);
};

export const getFirstLectureId = async (code: string) => {
  const data = await CourseModel.findOne(
    { code },
    { _id: 0, lectures: { $slice: 1 } }
  );

  if (!data || !data.lectures || data.lectures.length === 0) {
    return null;
  }

  return data.lectures[0]._id.toString();
};

// Create a function to add a new question with (question).
export const addNewQuestion = async (
  _id: string,
  lectureId: string,
  question: Omit<Question, "due_date">
) => {
  const data = await CourseModel.updateOne(
    { _id, "lectures._id": lectureId },
    { $addToSet: { "lectures.$.questions": question } }
  );

  if (data.modifiedCount) {
    console.log("add new question");
    return;
  }

  console.log("Add new question failed", data);
};

// Create a function and use the aggregation pipeline to find all questions for a specific course ID and lecture ID. (with pagination).
export const getAllQuestions = async (
  courseId: string,
  lectureId: string,
  page: number = 1,
  limit: number = 10
) => {
  const data = await CourseModel.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(courseId) } },
    {
      $addFields: {
        lectures: {
          $filter: {
            input: "$lectures",
            as: "lecture",
            cond: {
              $eq: ["$$lecture._id", new mongoose.Types.ObjectId(lectureId)],
            },
          },
        },
      },
    },
    { $unwind: "$lectures" },
    { $unwind: "$lectures.questions" },
    { $skip: (page - 1) * limit },
    { $limit: limit },
    {
      $project: {
        _id: 0,
        question_id: "$lectures.questions._id",
        question: "$lectures.questions.question",
        due_date: "$lectures.questions.due_date",
      },
    },
  ]);

  return data;
};

// Create a function and use the aggregation pipeline to find one question by ID, for a given course ID and lecture ID.
export const findAQuestionById = async (
  courseId: string,
  lectureId: string,
  questionId: string
) => {
  const data = await CourseModel.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(courseId) } },
    {
      $addFields: {
        lectures: {
          $filter: {
            input: "$lectures",
            as: "lecture",
            cond: {
              $eq: ["$$lecture._id", new mongoose.Types.ObjectId(lectureId)],
            },
          },
        },
      },
    },
    { $unwind: "$lectures" },
    { $unwind: "$lectures.questions" },
    {
      $match: {
        "lectures.questions._id": new mongoose.Types.ObjectId(questionId),
      },
    },
    {
      $project: {
        _id: 0,
        question_id: "$lectures.questions._id",
        question: "$lectures.questions.question",
        due_date: "$lectures.questions.due_date",
      },
    },
  ]);

  return data.length > 0 ? data[0] : null;
};

// Create a function to update a question by ID, for a given course ID and lecture ID, and extend the due date for another 1 day.
export const updateAQuestionById = async (
  courseId: string,
  lectureId: string,
  questionId: string
) => {
  const data = await CourseModel.updateOne(
    {
      _id: new mongoose.Types.ObjectId(courseId),
      "lectures._id": new mongoose.Types.ObjectId(lectureId),
      "lectures.questions._id": new mongoose.Types.ObjectId(questionId),
    },
    {
      $set: {
        "lectures.$[lecture].questions.$[question].due_date":
          Date.now() + 86400000,
      },
    },
    {
      arrayFilters: [
        { "lecture._id": new mongoose.Types.ObjectId(lectureId) },
        { "question._id": new mongoose.Types.ObjectId(questionId) },
      ],
    }
  );

  return data;
};

// Create a function to update all questions, for a given course ID and lecture ID, and extend the due date for another 1 day.
export const updateAllQuestions = async (
  courseId: string,
  lectureId: string
) => {
  const data = await CourseModel.updateOne(
    {
      _id: new mongoose.Types.ObjectId(courseId),
      "lectures._id": new mongoose.Types.ObjectId(lectureId),
    },
    {
      $set: {
        "lectures.$[lecture].questions.$[].due_date": Date.now() + 86400000,
      },
    },
    {
      arrayFilters: [{ "lecture._id": new mongoose.Types.ObjectId(lectureId) }],
    }
  );

  return data;
};

// Create a function to delete one question by ID, for a given course ID and lecture ID.
export const deleteAQuestionById = async (
  courseId: string,
  lectureId: string,
  questionId: string
) => {
  const data = await CourseModel.updateOne(
    {
      _id: new mongoose.Types.ObjectId(courseId),
      "lectures._id": new mongoose.Types.ObjectId(lectureId),
      "lectures.questions._id": new mongoose.Types.ObjectId(questionId),
    },
    {
      $pull: {
        "lectures.$[lecture].questions": {
          _id: new mongoose.Types.ObjectId(questionId),
        },
      },
    },
    {
      arrayFilters: [{ "lecture._id": new mongoose.Types.ObjectId(lectureId) }],
    }
  );

  return data;
};

// Create a function to find the nearest 10 users that match a certain set of hobbies, using 2d index.
export const findNearestUsersWithHobbies = async (
  userLocation: [number, number],
  hobbies: string[],
  maxDistance: number = 10000,
  limit: number = 10
) => {
  try {
    const users = await UserModel.aggregate([
      {
        $geoNear: {
          near: userLocation,
          distanceField: "distance",
          maxDistance: maxDistance,
        },
      },
      { $match: { hobbies: { $in: hobbies } } },
      { $limit: limit },
    ]);

    return users;
  } catch (error) {
    console.error("Error finding nearest users:", error);
    throw error;
  }
};
