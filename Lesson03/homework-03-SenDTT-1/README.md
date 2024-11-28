[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mxQH7ELl)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=17349860)
# CS572-Homework-03-Aggregation
Given the two collections `users` and `courses`. And another sub-schemas of `lectureSchema`, `fileSchema`,  and `questionSchema`.
```typescript
import { Schema, model, InferSchemaType } from 'mongoose';

const userSchema = new Schema({
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    location: { type: [Number], required: false },
    hobbies: { type: [String], required: false }
}, { versionKey: false })

const courseSchema = new Schema({
    code: { type: String, required: true },
    title: { type: String, required: true },
    created_by: {
        user_id: Schema.Types.ObjectId,
        fullname: String,
        email: String
    },
    lectures: [lectureSchema]
}, { versionKey: false });

const lectureSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    files: [fileSchema],
    questions: [questionSchema]
});

const fileSchema = new Schema({
    originalname: { type: String, required: true },
    mimetype: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true }
});

const questionSchema = new Schema({
    question: { type: String, required: true },
    due_date: { type: Number, default: ()=> Date.now() + 86400000 },
});

export type User = InferSchemaType<typeof userSchema>;
export type Course = InferSchemaType<typeof courseSchema>;
export type Lecture = InferSchemaType<typeof lectureSchema>;
export type File = InferSchemaType<typeof fileSchema>;
export type Question = InferSchemaType<typeof questionSchema>;

export default model<User>('user', userSchema);
export default model<Course>('course', courseSchema);
```    
<ins>Implement the following functions:</ins>
* Create a function to add a new user with (`fullname`, `email`, `password`, and `location` with the following value `[-91.96731488465576, 41.018654231616374]`)
* Create a function to add a new course with (`code`, `title`). Use the output of the previous function to fill out the `created_by` properties (prefixed hard-coded values).
* Create a function to add a new lecture with (`title`, `description`).
* Create a function to add a new question with (`question`). 
* Create a function and use the aggregation pipeline to find all questions for a specific course ID and lecture ID. (with pagination).
* Create a function and use the aggregation pipeline to find one question by ID, for a given course ID and lecture ID.
* Create a function to update a question by ID, for a given course ID and lecture ID, and extend the due date for another 1 day.
* Create a function to update all questions, for a given course ID and lecture ID, and extend the due date for another 1 day.
* Create a function to delete one question by ID, for a given course ID and lecture ID.
* Create a function to find the nearest 10 users that match a certain set of hobbies, using `2d` index. 
  

