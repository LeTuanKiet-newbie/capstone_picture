import express from "express";
import {
  createUser,
  loginUser,
  updateUser,
  listSaved,
  listCreatedImg,
  getUserInfo,
} from "../controller/userController.js";

const userRoute = express.Router();
userRoute.post("/signup", createUser);
userRoute.get("/info", getUserInfo);
userRoute.post("/login", loginUser);
userRoute.put("/update", updateUser);

userRoute.get("/list-saved-img", listSaved);
userRoute.get("/list-created-img", listCreatedImg);

export default userRoute;
