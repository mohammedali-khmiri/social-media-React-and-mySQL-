import express from "express";
const app = express();
import authRouter from "./routers/auth.js";
import userRouter from "./routers/users.js";
import postRouter from "./routers/posts.js";
import commentRouter from "./routers/comments.js";
import likeRouter from "./routers/likes.js";


//middlewers

app.use(express.json)

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likes", likeRouter);

app.listen(8000, () => {
	console.log("Server Working!");
});
