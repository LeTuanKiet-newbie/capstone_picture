import { PrismaClient } from "@prisma/client";
import validator from "validator";
import { checkToken, decodeToken } from "../config/jwt.js";

const prisma = new PrismaClient();

const addPicture = async (req, res) => {
  try {
    const { token } = await req.headers;
    const checkLegitToken = await validator.isJWT(token);
    const checkValidToken = await checkToken(token);

    if (!checkLegitToken || !checkValidToken) {
      return;
    }

    console.log(decodeToken(token));

    const user = await checkToken(token).data;

    const { img_url, img_title, img_description } = await req.body;

    const newPicture = {
      user_id: user.user_id,
      img_create_date: new Date(),
      img_title,
      img_url,
      img_title,
      img_description,
    };

    await prisma.images.create({
      data: newPicture,
    });

    res.status(201).send("Added successfully!");
  } catch (e) {
    console.log(e);
    res.status(401).send(e);
  }
};

export { addPicture };
