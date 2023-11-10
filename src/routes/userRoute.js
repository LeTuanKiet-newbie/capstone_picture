import express from "express";
import {
  createUser,
  loginUser,
  updateUser,
} from "../controller/userController.js";

const userRoute = express.Router();
userRoute.post("/signup", createUser);
userRoute.post("/login", loginUser);
userRoute.put("/update", updateUser);

export default userRoute;
