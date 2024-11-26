import mongoose from "mongoose";
import {
  addNewPost,
  addNewCommentForPostId,
  getAllCommentsByPostId,
  updateAComment,
  deleteAComment,
  Post,
} from "../models/post";

const allComments = [
  {
    text: "This is a test comment - 001.",
    user: { email: "test@example.com", name: "Test User" },
  },
  {
    text: "This is a test comment - 002.",
    user: { email: "test2@example.com", name: "Test User 2" },
  },
  {
    text: "This is a test comment - 003.",
    user: { email: "test3@example.com", name: "Test User 3" },
  },
  {
    text: "This is a test comment - 004.",
    user: { email: "test4@example.com", name: "Test User 4" },
  },
  {
    text: "This is a test comment - 005.",
    user: { email: "test5@example.com", name: "Test User 5" },
  },
  {
    text: "This is a test comment - 006.",
    user: { email: "test6@example.com", name: "Test User 6" },
  },
  {
    text: "This is a test comment - 007.",
    user: { email: "test7@example.com", name: "Test User 7" },
  },
  {
    text: "This is a test comment - 008.",
    user: { email: "test8@example.com", name: "Test User 8" },
  },
  {
    text: "This is a test comment - 009.",
    user: { email: "test9@example.com", name: "Test User 9" },
  },
  {
    text: "This is a test comment - 010.",
    user: { email: "test10@example.com", name: "Test User 10" },
  },
];

const runPostTests = async (connectDB: () => Promise<any>) => {
  try {
    await connectDB();
    console.log("\n--- Adding a new post ---");
    const post: Post = {
      title: "Sample Post",
      body: "This is the body of the sample post.",
      draft: false,
    };
    const newPost = await addNewPost(post);
    console.log("New Post ID:", newPost._id);

    console.log("\n--- Adding a new comment to the post ---");
    const comment = {
      text: "This is a test comment.",
      user: { email: "test@example.com", name: "Test User" },
    };
    await addNewCommentForPostId(newPost._id.toString(), comment);

    allComments.map(async (cmt) => {
      await addNewCommentForPostId(newPost._id.toString(), cmt);
    });

    console.log("\n--- Getting all comments for the post ---");
    const data = await getAllCommentsByPostId(newPost._id.toString(), 1, 10);
    console.log("Comments:", data?.comments?.length);

    const commentId = data?.comments?.[0]?._id.toString();
    console.log("Comment ID for testing:", commentId);

    console.log("\n--- Updating the comment ---");
    const updatedText = "Updated comment text";
    if (commentId) {
      await updateAComment(newPost._id.toString(), commentId, updatedText);
    } else {
      console.error("No comment found to update!");
    }

    console.log("\n--- Deleting the comment ---");
    if (commentId) {
      await deleteAComment(newPost._id.toString(), commentId);
    } else {
      console.error("No comment found to delete!");
    }
    mongoose.connection.close();
  } catch (error) {
    console.error("Error during testing:", error);
  }
};

export default runPostTests;
