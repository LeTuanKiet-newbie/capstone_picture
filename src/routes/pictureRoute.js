import express from "express";
import {
  createComment,
  findImgByName,
  getPicture,
  checkSaveImg,
  deleteImg,
  addPicture,
  getCommentsByImageId,
  getUserInfoByImg,
} from "../controller/pictureController.js";
import { handleUpload } from "../middleware/handler.js";
import { upload } from "../controller/uploadController.js";
const picRoute = express.Router();

picRoute.get("/get-picture", getPicture);
picRoute.post("/addpicture", upload.single("avatar"), handleUpload, addPicture);
picRoute.delete("/delete/:img_id", deleteImg);
picRoute.get("/search", findImgByName);

picRoute.get("/get-info/:img_id", getUserInfoByImg);
picRoute.get("/saved/:img_id", checkSaveImg);

picRoute.post("/create-comment/:img_id", createComment);
picRoute.get("/get-comment/:img_id", getCommentsByImageId);
export default picRoute;
