[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/TTal0Qro)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=17335434)
### CS572-Homework-02-CRUD

* Define what is [`ObjectId`](https://www.mongodb.com/docs/manual/reference/bson-types/#objectid) and what data it includes?
    - In MongoDB, each document is stored in a collection requires a unique _id field that as a primary key. If an inserted document does not include _id, the MongoDB driver automatically generate ObjectId for the _id field.
    - It includes Timestamp, Machine Identifier, Process Identifier, Incrementing Counter.
* How do we set a field to an `ObjectId` type in Mongoose?
    - We should set that field type is as ObjectId when defining a schema.

    ```jsx
    const userSchema = new Schema({
    profileId: { type: Schema.Types.ObjectId, ref: 'Profile' }
    });
    ```

* How do we generate a new `ObjectId` in Mongoose?

    - an inserted document has to generate ObjectId for this field by

    ```jsx
    { profileId: new mongoose.Types.ObjectId() }
    ```

#### Coding Question 01
Given the following Schema:
```typescript
const ProductSchema = new Schema({
    name: { type: String, required: true, unique: true },
    location: {
        category: { type: String, enum: ['vegetable', 'fruit'], default: 'vegetable' },
        aisle: { type: String, required: true }
    },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
}, { timestamps: true });

type ProductWithTimestamps = InferSchemaType<typeof ProductSchema>;
export type Product = Partial<ProductWithTimestamps>;

export const ProductModel = model<Product>('product', ProductSchema);
```
* Write a function to add a new product.
* Write a function to delete a product by `_id`.
* Write a function to update a product properties by `_id`.
* Write a function to apply a discount of 10% across all fruits.
* Write a function to increase the vegetables price 50 cents.
* Write a function to find all products with a price between a range of minimum and maximum value, with pagination.
* Write a function to find all products in a specific category, with pagination.
* Write a function to find all products with an amount less than 10, with pagination.
  
Save the connection string as an environment variable. Pass the environment file with this command:
```
npx tsx watch --env-file=.env ./code.ts
```
   
#### Coding Question 02
Given the following Schema:
```typescript
const CommentSchema = new Schema({
    text: { type: String, required: true },
    user: {
        email: { type: String, required: true },
        name: { type: String, required: true }
    },
}, { timestamps: true });

const PostSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    draft: { type: Boolean, default: true },
    comments: [CommentSchema],
}, { timestamps: true });

type PostWithTimestamps = InferSchemaType<typeof PostSchema>;
type CommentWithTimestamps = InferSchemaType<typeof CommentSchema>;
export type Post = Partial<PostWithTimestamps>;
export type Comment = Partial<CommentWithTimestamps>;

export const PostModel = model<Post>('post', PostSchema);
```
* Write a function to add a new post *(with empty comments[] array)*.
* Write a function to add a new comment to a specific post id. 
* Write a function to return all comments for a specific post id, with pagination.
* Write a function to update a comment text, identified by post id, and comment id.
* Write a function to delete a comment by comment id, for a specific post id.
