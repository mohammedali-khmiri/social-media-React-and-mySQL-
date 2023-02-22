import express from "express";
const app = express();
import authRouter from "./routers/auth.js";
import userRouter from "./routers/users.js";
import postRouter from "./routers/posts.js";
import commentRouter from "./routers/comments.js";
import likeRouter from "./routers/likes.js";
import { db } from "./connectionDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

/* A middleware that parses the body of the request and makes it available on the request object. */
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

/* Connecting to the database. */
db.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err);
    return;
  }
  console.log("DB connected !");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likes", likeRouter);

app.listen(8000, () => {
  console.log("Server Working!");
});
