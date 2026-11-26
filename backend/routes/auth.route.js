import express from "express";
import { login, logout, me } from "../controllers/auth.controller.js";
import protect from "../middleware/protect.js";

const authRouter = express.Router()  // creates a new Express Router object (instance) and stores its reference in the variable authRouter

authRouter.get("/logout",logout)
authRouter.post("/login",login)
authRouter.get("/me",protect,me)

export default authRouter