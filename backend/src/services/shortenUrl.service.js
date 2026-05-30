import { nanoid } from "nanoid";
import pkg from "@prisma/client";
import redis from "../config/redis.js";

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const shortenUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if(!originalUrl || originalUrl.length === 0){
        return res.status(400).json({message:'Please enter URL'})
    }

    if(!URL.canParse(originalUrl)){
        return res.status(400).json({message:'Please enter a Valid URL'})
    }

    const newid = nanoid(12);

    const response = await prisma.url.create({
      data: {
        originalUrl: originalUrl,
        shortUrl: newid,
      },
    });

    redis.set(response.shortUrl, originalUrl, {ex:60*60*24})

    return res.status(200).json({shortUrl : `${response.shortUrl}`});
  } catch (err) {
    res.status(400).json({message:err.message})
  }
};

export default shortenUrl;
