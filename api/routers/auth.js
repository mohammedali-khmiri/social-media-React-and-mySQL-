import Express from "express";
import { login, register, logout } from "../controllers/auth.js";
const router = Express.Router();

router.get("/register", register);
router.get("/login", login);
router.get("/logout", logout);
export default router;
