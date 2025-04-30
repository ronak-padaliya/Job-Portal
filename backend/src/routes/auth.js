import { Router } from "express";
import userRoutes from "./user.js";

const routes = Router();
routes.use("/user", userRoutes);

export { routes };
