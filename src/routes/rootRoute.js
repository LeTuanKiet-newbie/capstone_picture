import express from "express";
import userRoute from "./userRoute.js";

const rootRoute = express.Router();

rootRoute.use("/user", userRoute);

export default rootRoute;
