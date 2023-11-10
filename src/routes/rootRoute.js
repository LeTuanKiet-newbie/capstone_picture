import express from "express";
import userRoute from "./userRoute.js";
import pictureRoute from "./pictureRoute.js";

const rootRoute = express.Router();

rootRoute.use("/user", userRoute);
rootRoute.use("/picture", pictureRoute);

export default rootRoute;
