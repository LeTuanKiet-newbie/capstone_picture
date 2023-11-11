import express  from "express";
import {comments,findImg, getPicture,infoUser,infoComment, checkSaveImg,lstSave,lstCreatedImg,deleteImg,addPicture} from "../controller/pictureController.js"
const picRoute = express.Router();

picRoute.get("/get-picture",getPicture);//ok
picRoute.get("/find/search",findImg);//ok
picRoute.get("/get-info/:imgId",infoUser);
picRoute.get("/get-infoComment/:imgId",infoComment);
picRoute.get("/image/:imgId/saved",checkSaveImg);
picRoute.post("/create-comment/:img_id",comments);//ok
picRoute.get("/detail-save",lstSave);
picRoute.get("/created-img",lstCreatedImg);//ok
picRoute.delete("/image/:imgId",deleteImg);//ok
picRoute.post("/add-pic",addPicture)//ok
export default picRoute;