import express from "express";
import { createUser, loginUser } from "../controller/userController.js";

const userRoute = express.Router();
userRoute.post("/signup", createUser);
userRoute.post("/login", loginUser);
export default userRoute;
