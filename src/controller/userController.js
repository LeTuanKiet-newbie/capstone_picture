import { PrismaClient } from "@prisma/client"; //dung de query
import bcrypt from "bcrypt";
import validator from "validator";
import { createToken, decodeToken } from "../config/jwt.js";
import { checkTokenExist } from "../middleware/handler.js";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    let {
      user_fullname,
      user_email,
      user_phone,
      age,
      user_password,
      user_avatar,
      user_role,
    } = await req.body;
    const checkEmail = await prisma.users.findFirst({
      where: {
        user_email,
      },
    });
    if (!checkEmail) {
      const newPassword = bcrypt.hashSync(user_password, 10);
      if (validator.isEmpty(user_role)) {
        user_role = "user";
      }
      const newUser = {
        user_fullname,
        user_avatar,
        user_email,
        user_phone,
        age,
        user_password: newPassword,
        user_role,
      };
      await prisma.users.create({
        data: newUser,
      });
      res.status(201).send("Created successfully!");
    } else {
      res.status(400).send("Email have already taken!");
    }
  } catch (e) {
    res.status(500).send({ message: "Bad request" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { user_email, user_password } = await req.body;
    const user = await prisma.users.findFirst({
      where: {
        user_email,
      },
    });
    if (!user) {
      res.status(404).send({ message: "Wrong email!" });
      return;
    }

    const comparePass = bcrypt.compareSync(user_password, user.user_password);
    if (!comparePass) {
      res.status(404).send({ message: "Wrong password!" });
      return;
    }

    const token = createToken(user);
    res.setHeader("token", token);
    res.status(200).send("Login successfully!");
  } catch (e) {
    res.status(500).send({ message: "Bad Connection!" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { token } = await req.headers;
    if (!token || checkTokenExist(req) === 401) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    const { user_id } = decodeToken(token).data;

    const updateInfo = await req.body;
    const user = await prisma.users.findFirst({
      where: {
        user_id,
      },
    });
    const updatedUser = await { ...user, ...updateInfo };
    console.log(updatedUser);
    await prisma.users.update({
      data: { ...updatedUser },
      where: {
        user_id: updatedUser.user_id,
      },
    });
    res.status(200).send("Updated completed!");
  } catch (e) {
    res.status(500).send({ message: "No Connection!" });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const { token } = await req.headers;
    if (!token || checkTokenExist(req) === 401) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    const user = decodeToken(token).data;
    delete user.user_password;
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send({ message: "Bad Connection!" });
  }
};

const listSaved = async (req, res) => {
  try {
    const { token } = await req.headers;
    if (!token || checkTokenExist(req)) {
      res.status(401).send({ message: "Unauthorized!" });
    }
    const userInfo = decodeToken(token);
    const { user_id } = userInfo.data;
    const save_Img = await prisma.save_image.findMany({
      where: {
        user_id: user_id,
      },
      include: {
        images: true,
      },
    });
    if (!save_Img.length) {
      return res
        .status(404)
        .send({ message: "You haven't saved any pictures!" });
    }
    res.send(save_Img);
  } catch (e) {
    res.status(500).send({ message: "Bad Connection!" });
  }
};

const listCreatedImg = async (req, res) => {
  try {
    const { token } = await req.headers;
    if (!token || checkTokenExist(req)) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    const { user_id } = decodeToken(token).data;

    const listImgs = await prisma.images.findMany({
      where: {
        user_id,
      },
    });
    if (!listImgs.length) {
      return res
        .status(404)
        .send({ message: "You haven't added any pictures!" });
    }
    res.status(200).send(listImgs);
  } catch (e) {
    res.status(500).send({ message: "Bad Connection!" });
  }
};
export {
  createUser,
  loginUser,
  updateUser,
  listCreatedImg,
  listSaved,
  getUserInfo,
};
