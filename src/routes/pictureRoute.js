import express from "express";
import { addPicture } from "../controller/pictureController.js";

const pictureRoute = express.Router();

pictureRoute.post("/addpicture", addPicture);

export default pictureRoute;
