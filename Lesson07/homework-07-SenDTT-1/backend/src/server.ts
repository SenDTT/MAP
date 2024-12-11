import express, { ErrorRequestHandler, json } from "express";
import morgan from "morgan";
import cors from "cors";
import diary_routes from "./routes/diaryRoute";
import auth_routes from "./routes/authRoute";
import { connectDB } from "./db";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(json());
app.use(cors());

connectDB();

app.use("/auth", auth_routes);
app.use("/diary", diary_routes);

const error_handler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof Error) {
    res.status(500).json({ error: err.message });
  } else {
    res.status(500).json({ error: "An unknown error occurred" });
  }
};
app.use(error_handler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
