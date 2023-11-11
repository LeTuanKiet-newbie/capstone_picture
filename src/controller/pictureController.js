import { PrismaClient } from "@prisma/client";
import validator from "validator";
import { decodeToken, checkToken } from "../config/jwt.js";

const prisma = new PrismaClient();
 const getPicture = async (req,res) =>{
    try{
        const images = await prisma.images.findMany()
        if(images){
            res.send(images)
        }else{
            res.status(400).send("None picture!")
        }

    }
    catch(err){
        console.log(err)
        res.status(400).send("loi!")
    }
    
}

 const findImg = async(req,res)=>{
    try{
      const {keyword} = req.query;
    const images = await prisma.images.findMany({
        where:{
            img_title:{
                contains:keyword
            }
        }
    })
  if(!images.length){
    return res.status(404).send("khong thay")
  }
    res.send(images)
  }catch(e){
      res.status(500).send("network err")
    }
}       

 const infoUser = async(req,res)=>{
    const imgId = parseInt(req.params.id);

    const imageInfo = await prisma.save_image.findUnique({
        where:{
            save_img_id: imgId
        },
        include:{
            users:true
        }
    })
    if (imageInfo) {
        res.send(imageInfo);
    } else {
        res.status(404).send("Không tìm thấy ảnh");
    }
}
 const infoComment = async(req,res)=>{
    const imgId = parseInt(req.image.id);

    const imageInfo = await prisma.images.findMany({
        where:{
            img_id: imgId
        },
        include:{
            comments: {
                select:{
                  content:true
                }
            }
        }
    })
        res.send(imageInfo);

}

 const checkSaveImg = async(req,res)=>{
    try{
        const imgId = parseInt(req.params.id);
        const {token} = req.headers;
        const userInfo = decodeToken(token);
        const {user_id} = userInfo.data;

        const saveImg = await prisma.save_image.findUnique({
            where:{
                user_id,
                img_id:imgId
            }
        });
        if(saveImg){
            res.send({saved:true})
        }
        else{
            res.send({saved:false})
        }
    }catch(err){
        console.log(err)
        res.send("Lỗi sever")
    }
}

 const comments =async (req,res) =>{
    try{
    let { content} = req.body;
    let {img_id} = parseInt(req.params) 
    let {token} = req.headers;
    const checkedToken = checkToken(token);
    if(!checkedToken){
      return;
    }
    let userInfo = decodeToken(token);
    let {user_id} = userInfo.data;

    let newData = {
        user_id,
        img_id,
        content,
        comment_create_date:new Date(),
        
    }
    await prisma.comments.create({data:newData});
    res.status(201).send("oke la")
    }
   catch(e){
    res.status(500).send("chua dang nhap")
    console.log(e)
   }

}

 const lstSave = async (req,res) => {
    const {token} = req.headers;
    const userInfo = decodeToken(token);
    const user_id = userInfo.data.checkEmail;
    const save_Img = await prisma.save_image.findMany({
        where:{
            user_id:user_id
        },
        include:{
            images:true
        }
    })
    const save = save_Img.map((item)=> item.image)
    res.send(save);
}


 const lstCreatedImg = async (req,res) => {
  try{
   const {token} = req.headers;
    const userInfo = decodeToken(token);
    const user_id = userInfo.data.checkEmail;
  
    const save_Img = await prisma.images.findMany({
        where:{
            user_id
        }
    })

    res.send(save_Img); 
  }catch(e){
    res.status(400).send("err")
  }
    
}

 const deleteImg = async (req,res) =>{
    const {imgId} = parseInt(req.params.id);
    const {token} = req.headers;
    const userInfo = decodeToken(token);
    const {user_id} = userInfo.data.checkEmail;
    
    const isUserImg = await prisma.image.findFirst({
        where:{
            img_id:imgId,
            user_id:user_id
        }
    })
    if(isUserImg){
        await prisma.image.delete({
            where:{
                img_id:imgId
            }
        })
        res.send("oke")
    }else{
        res.send("don't have permison")
    }
}

const addPicture = async (req, res) => {
  try {
    const { token } = await req.headers;
    const checkLegitToken = await validator.isJWT(token);
    const checkValidToken = await checkToken(token);
    
    if (!checkLegitToken || !checkValidToken) {
      return;
    }
    const user = await checkToken(token).data;

    const { img_url, img_title, img_description } = await req.body;
    const time = new Date();
    const img_create_date = time.toISOString();
    
    const newPicture = {
      user_id: user.user_id,
      img_create_date,
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
export {
  deleteImg,lstCreatedImg,lstSave,comments,checkSaveImg,infoComment,getPicture,findImg,infoUser,addPicture
}


