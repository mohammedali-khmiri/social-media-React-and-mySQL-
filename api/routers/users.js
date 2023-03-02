import express from "express";
import { getUser, updateUser } from "../controllers/user.js";
const router = express.Router();

router.get("/find/:userId", getUser);
router.put("/update", updateUser);

export default router;
