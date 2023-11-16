import jwt from "jsonwebtoken";
import config from "./config.js";

const createToken = (data) => {
  let token = jwt.sign({ data }, config.secret_string, {
    algorithm: "HS256",
    expiresIn: "60d",
  });
  return token;
};
const checkToken = (data) => {
  return jwt.verify(data, config.secret_string, function (err, decoded) {
    if (err) {
      return 401;
    }
  });
};
const decodeToken = (data) => {
  return jwt.decode(data);
};

export { createToken, checkToken, decodeToken };
