import multer, { diskStorage } from "multer";

export const upload = multer({
  storage: diskStorage({
    destination: process.cwd() + "/public/img", // đường dẫn mà file sẽ được lưu
    filename: (req, file, callback) =>
      callback(null, new Date().getTime() + "_" + file.originalname), // đổi tên file
  }),
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      file["error"] = "Please upload a JPG, JPEG or PNG file!";
      callback(undefined, false, file.error);
      callback(new Error("Please upload a JPG, JPEG or PNG file!"));
    } else {
      callback(undefined, true);
    }
  },
});
