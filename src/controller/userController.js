import { PrismaClient } from "@prisma/client"; //dung de query
import bcrypt from "bcrypt";
import validator from "validator";
import { createToken } from "../config/jwt.js";

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
      const newPassword = await bcrypt.hashSync(user_password, 10);
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
    res.status(400).send({ message: "Bad request" });
  }
};

const loginUser = async (req, res) => {
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

  const comparePass = await bcrypt.compareSync(
    user_password,
    user.user_password
  );
  if (!comparePass) {
    res.status(404).send({ message: "Wrong password!" });
    return;
  }

  const token = createToken(user);
  res.setHeader("token", token);
  res.status(200).send("Login successfully!");
};

export { createUser, loginUser };
