import express from "express";
import {
  createUser,
  getUserInfo,
  loginUser,
  updateUser,
} from "../controller/userController.js";

const userRoute = express.Router();
userRoute.post("/signup", createUser);
userRoute.post("/login", loginUser);
userRoute.put("/update", updateUser);
userRoute.get("/getuserinfo/:img_id", getUserInfo);

export default userRoute;
