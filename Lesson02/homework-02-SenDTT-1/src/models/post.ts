import { InferSchemaType, model, Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    text: { type: String, required: true },
    user: {
      email: { type: String, required: true },
      name: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    draft: { type: Boolean, default: true },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

type PostWithTimestamps = InferSchemaType<typeof PostSchema>;
type CommentWithTimestamps = InferSchemaType<typeof CommentSchema>;
export type Post = Partial<PostWithTimestamps>;
export type Comment = Partial<CommentWithTimestamps>;

export const PostModel = model<Post>("post", PostSchema);

// Write a function to add a new post (with empty comments[] array).
export const addNewPost = async (post: Post) => {
  const newPost = await PostModel.create(post);

  console.log("newPost: " + newPost._id);

  return newPost;
};

// Write a function to add a new comment to a specific post id.
export const addNewCommentForPostId = async (
  postId: string,
  comment: Comment
) => {
  const updatedPost = await PostModel.updateOne(
    { _id: postId },
    { $push: { comments: comment } }
  );

  if (updatedPost.modifiedCount == 1) {
    console.log("add comment successful");
    return;
  }
  console.log("add comment failed");
};

// Write a function to return all comments for a specific post id, with pagination.
export const getAllCommentsByPostId = async (
  _id: string,
  page: number = 1,
  limit: number = 10
) => {
  const data = PostModel.findOne(
    { _id },
    { _id: 0, comments: { $slice: [(page - 1) * limit, limit] } }
  );

  return data;
};

// Write a function to update a comment text, identified by post id, and comment id.
export const updateAComment = async (
  _id: string,
  commentId: string,
  text: string
) => {
  const data = await PostModel.updateOne(
    { _id, "comments._id": commentId },
    { $set: { "comments.$.text": text } }
  );

  if (data.modifiedCount == 1) {
    console.log("update comment successful");
    return;
  }

  console.log("update comment failed");
};

// Write a function to delete a comment by comment id, for a specific post id.
export const deleteAComment = async (_id: string, commentId: string) => {
  const data = await PostModel.updateOne(
    { _id },
    { $pull: { comments: { _id: commentId } } }
  );

  if (data.modifiedCount == 1) {
    console.log("delete comment successful");
    return;
  }

  console.log("delete comment failed");
};
