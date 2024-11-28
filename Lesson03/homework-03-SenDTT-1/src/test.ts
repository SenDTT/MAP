import { Course, Lecture, Question, User } from "./schema";
import {
  addNewCourse,
  addNewLecture,
  addNewQuestion,
  addNewUser,
  deleteAQuestionById,
  findAQuestionById,
  findNearestUsersWithHobbies,
  getAllQuestions,
  getCourseByCode,
  getFirstLectureId,
  getUserById,
  updateAllQuestions,
  updateAQuestionById,
} from "./service";

const runTestCases = async (connectDB: () => Promise<any>) => {
  await connectDB();

  //   const newUser = {
  //     fullname: "John Doe 4",
  //     email: "johndoe9@example.com",
  //     password: "securepassword123",
  //     location: [-91.96731488465576, 41.018654231616374],
  //   };

  //   const user = await addNewUser(newUser);

  const user = await getUserById("6747863af46661d8bf134239");

  //   if (user) {
  //     const newCourse: Omit<Course, "lectures"> = {
  //       code: "CS108",
  //       title: "Introduction to Computer Science",
  //       created_by: {
  //         user_id: user._id,
  //         fullname: user.fullname,
  //         email: user.email,
  //       },
  //     };

  //     const course1 = await addNewCourse(newCourse);
  //   }

  const course = await getCourseByCode("CS108");

  if (course) {
    const newLecture: Omit<Lecture, "questions" | "files"> = {
      title: "Introduction to Algorithms",
      description: "Overview of basic algorithms.",
    };

    await addNewLecture(course.code, newLecture);

    const lectureId = await getFirstLectureId(course.code);
    const courseId = course._id.toString();

    console.log(lectureId, courseId);
    if (lectureId) {
      const newQuestion: Omit<Question, "due_date"> = {
        question: "What is an algorithm?",
      };

      const result = await addNewQuestion(courseId, lectureId, newQuestion);
    }

    // find all questions by courseId and lectureId, add pagination
    if (lectureId && courseId) {
      const data = await getAllQuestions(courseId, lectureId);
      console.log(
        "------- get all questions by courseId and lectureId, add pagination"
      );
      console.log(data);

      // find a question by id
      const questionId = "67488c5851e8b51431fdfda6";
      const findQuestion = await findAQuestionById(
        courseId,
        lectureId,
        questionId
      );
      console.log("------- find a question by id");
      console.log(findQuestion, new Date(findQuestion.due_date));

      // update a question by id
      const result = await updateAQuestionById(courseId, lectureId, questionId);
      console.log("------- update a question by id");
      console.log(result);

      const question1 = await findAQuestionById(
        courseId,
        lectureId,
        questionId
      );
      console.log("------- find a question by id");
      console.log(question1, new Date(question1.due_date));

      // update all questions
      const result2 = await updateAllQuestions(courseId, lectureId);
      console.log("------- update all questions");
      console.log(result2);

      const question2 = await findAQuestionById(
        courseId,
        lectureId,
        questionId
      );
      console.log("------- find a question by id");
      console.log(question2, new Date(question1.due_date));

      // delete a question
      const result3 = await deleteAQuestionById(
        courseId,
        lectureId,
        "67488c64216e1d6d7735cd15"
      );
      console.log("------- delete a question by id");
      console.log(result3);

      const question3 = await findAQuestionById(
        courseId,
        lectureId,
        "67488c64216e1d6d7735cd15"
      );
      console.log("------- find a question by id");
      console.log(question3);
    }
  }

  //   const listUsers: User[] = [
  //     {
  //       fullname: "Alice Johnson",
  //       email: "alice.johnson@example.com",
  //       password: "securepassword1",
  //       location: [-91.96731488465576, 41.018654231616374],
  //       hobbies: ["reading", "cycling"],
  //     },
  //     {
  //       fullname: "Bob Smith",
  //       email: "bob.smith@example.com",
  //       password: "securepassword2",
  //       location: [-92.96731488465576, 42.018654231616374],
  //       hobbies: ["hiking", "gaming"],
  //     },
  //     {
  //       fullname: "Charlie Brown",
  //       email: "charlie.brown@example.com",
  //       password: "securepassword3",
  //       location: [-93.96731488465576, 40.018654231616374],
  //       hobbies: ["swimming", "cooking"],
  //     },
  //     {
  //       fullname: "Daisy Miller",
  //       email: "daisy.miller@example.com",
  //       password: "securepassword4",
  //       location: [-91.56731488465576, 41.518654231616374],
  //       hobbies: ["writing", "yoga"],
  //     },
  //     {
  //       fullname: "Ethan Hunt",
  //       email: "ethan.hunt@example.com",
  //       password: "securepassword5",
  //       location: [-90.96731488465576, 41.718654231616374],
  //       hobbies: ["climbing", "photography"],
  //     },
  //   ];

  //   listUsers.map(async (user) => {
  //     await addNewUser(user);
  //   });

  const data = await findNearestUsersWithHobbies(
    [-90.96731488465576, 41.718654231616374],
    ["climbing", "photography"],
    10000,
    3
  );

  console.log(data);
};

export default runTestCases;
