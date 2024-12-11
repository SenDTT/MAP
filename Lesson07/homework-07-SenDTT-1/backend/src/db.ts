import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import mongoose from "mongoose";

const env = dotenv.config();
dotenvExpand.expand(env);

export const connectDB = async () => {
  try {
    const dbURI = process.env.DB_CONNECTION_URI as string;
    console.log(dbURI);
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
