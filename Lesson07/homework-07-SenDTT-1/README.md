[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mTGnnNA6)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=17451259)
### CS572-Homework-07-Auth
Given the following Mongoose Models, create a backend and frontend applications to perform signup/signin + protected CRUD operations for a personal diary application. Users can only perform CRUD operations to their own entries.
```typescript
import { Schema, model, InferSchemaType, pluralize } from 'mongoose';

pluralize(null);

const userSchema = new Schema({
    fullname: String,
    email: { type: String, unique: true },
    password: String,
    picture_url: String
})

const diarySchema = new Schema({
    user_id: mongoose.Types.ObjectId,
    title: String,
    description: String,
}, {
    timestamps: true
})

export type User = InferSchemaType<typeof userSchema>;
export type Diary = InferSchemaType<typeof diarySchema>;

export const DiaryModel = model<Diary>('diary', diarySchema);
export const UserModel = model<User>('user', userSchema);
```
Use the following packages:
* `cors` to allow AJAX communication between client and server applications
* `express` to build the backend application
* `morgan` to log all incoming requests on the server
* `mongoose` to persist data into MongoDB
* `bcrypt` to hash and compare passwords
* `jsonwebtoken` to generate and verify JWT at the server
* `multer` to upload pictures to the server
* `jwt-decode` to read JWT at the client
  
You may need to configure express application with `express.static()` middleware to serve the user picture.
