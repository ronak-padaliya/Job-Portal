import { Router } from "express";
import { signIn, signUp } from "../controller/auth.js";

const userRoutes = Router();

userRoutes.post("/sign-up", signUp);
userRoutes.post("/sign-in", signIn);

export default userRoutes;
