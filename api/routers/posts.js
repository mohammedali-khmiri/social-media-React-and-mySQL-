import express from "express";
import { addPost, getTimeline } from "../controllers/post.js";
const router = express.Router();

router.get("/", getTimeline);
router.post("/new", addPost);

export default router;
