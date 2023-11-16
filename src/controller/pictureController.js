import { PrismaClient } from "@prisma/client";
import { decodeToken } from "../config/jwt.js";
import { checkTokenExist } from "../middleware/handler.js";

const prisma = new PrismaClient();

const getPicture = async (req, res) => {
  try {
    const { token } = await req.headers;
    if (token) {
      if (checkTokenExist(req) === 401) {
        return res
          .status(checkTokenExist(req))
          .send({ message: "Unauthorized!" });
      }
    }

    const images = await prisma.images.findMany();
    if (!images) {
      return res.status(404).send({ message: "Not Found!" });
    }
    res.status(200).send(images);
  } catch (err) {
    res.status(500).send({ message: "Bad Connection!" });
  }
};

const findImgByName = async (req, res) => {
  try {
    const { token } = await req.headers;
    if (token) {
      if (checkTokenExist(req) === 401) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
    }
    const { keyword } = await req.query;
    const images = await prisma.images.findMany({
      where: {
        img_title: {
          contains: keyword,
        },
      },
    });
    if (!images.length) {
      return res.status(404).send({ message: "Not Found!" });
    }
    res.status(200).send(images);
  } catch (e) {
    res.status(500).send({ message: "Bad Connection!" });
  }
};

const getUserInfoByImg = async (req, res) => {
  try {
    const { token } = await req.headers;
    if (!token || checkTokenExist(req) === 401) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    const img_id = await Number(req.params.img_id);

    const image = await prisma.images.findFirst({
      where: {
        img_id,
      },
      include: {
        users: {
          select: {
            user_fullname: true,
            user_email: true,
            user_phone: true,
            user_avatar: true,
          },
        },
      },
    });
    if (!image) {
      return res.status(404).send({ message: "Not Found!" });
    }
    const user = image.users;

    res.status(200).send(user);
  } catch {
    res.status(500).send({ message: "No internet!" });
  }
};

const getCommentsByImageId = async (req, res) => {
  try {
    const { token } = await req.headers;
    if (!token || checkTokenExist(req) === 401) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    const img_id = await Number(req.params.img_id);

    const arrComments = await prisma.comments.findMany({
      where: {
        img_id,
      },
      include: {
        users: {
          select: {
            user_fullname: true,
          },
        },
      },
    });
    res.send(arrComments);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Bad Connection!" });
  }
};

const checkSaveImg = async (req, res) => {
  try {
    const { token } = await req.headers;
    if (!token || checkTokenExist(req) === 401) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    const img_id = await Number(req.params.img_id);

    const userInfo = decodeToken(token);
    const { user_id } = userInfo.data;

    const saveImg = await prisma.save_image.findFirst({
      where: {
        user_id,
        img_id,
      },
    });
    if (saveImg) {
      res.status(200).send({ saved: true });
    } else {
      res.status(200).send({ saved: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Bad Connection!" });
  }
};

const createComment = async (req, res) => {
  try {
    const { token } = await req.headers;
    if (!token || checkTokenExist(req) === 401) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    const { content } = await req.body;
    if (!content) {
      return res
        .status(400)
        .send({ message: "You need to type in a comment to post it!" });
    }
    const img_id = await Number(req.params.img_id);
    const userInfo = decodeToken(token);
    const { user_id } = userInfo.data;

    const newData = {
      user_id,
      img_id,
      content,
      comment_create_date: new Date(),
    };
    await prisma.comments.create({ data: newData });
    res.status(201).send("Comment created!");
  } catch (e) {
    res.status(500).send({ message: "Bad Connection!" });
  }
};

const deleteImg = async (req, res) => {
  try {
    const { token } = await req.headers;
    if (!token || checkTokenExist(req) === 401) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    const img_id = await Number(req.params.img_id);
    const userInfo = decodeToken(token);
    const { user_id } = userInfo.data;

    const isUserImg = await prisma.images.findFirst({
      where: {
        img_id,
        user_id,
      },
    });
    if (!isUserImg) {
      return res.status(404).send({ message: "Not Found!" });
    }
    await prisma.comments.deleteMany({
      where: {
        img_id,
      },
    });
    await prisma.save_image.deleteMany({
      where: {
        img_id,
      },
    });
    await prisma.images.delete({
      where: {
        img_id,
      },
    });
    res.status(200).send("Deleted!");
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Bad Connection!" });
  }
};

const addPicture = async (req, res) => {
  try {
    const { token } = await req.headers;

    if (!token || checkTokenExist(req) === 401) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    const user = await decodeToken(token).data;

    const file = await req.file;
    const { img_title, img_description } = await req.body;
    console.log(file);

    const newPicture = {
      user_id: user.user_id,
      img_create_date: new Date(),
      img_title,
      img_url: file.path,
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
export {
  deleteImg,
  createComment,
  checkSaveImg,
  getCommentsByImageId,
  getPicture,
  findImgByName,
  getUserInfoByImg,
  addPicture,
};
