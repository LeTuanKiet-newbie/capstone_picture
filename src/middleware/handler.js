import { checkToken } from "../config/jwt.js";
const handleUpload = (error, req, res, next) => {
  return res.status(400).send({ error: error.message });
};
const checkTokenExist = (request) => {
  const { token } = request.headers;
  if (token) {
    return checkToken(token);
  }
};

export { handleUpload, checkTokenExist };
