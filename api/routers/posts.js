import express from "express";
import { addPost, getTimeline, deletePost } from "../controllers/post.js";
const router = express.Router();

router.get("/", getTimeline);
router.post("/new", addPost);
router.delete("/:id", deletePost);

export default router;
