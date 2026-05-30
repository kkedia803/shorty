import pkg from "@prisma/client";
import redis from "../config/redis.js";

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const getOriginalUrl = async (req, res) => {
  try {
    const { shorturl } = req.params;

    if (!shorturl || shorturl.length === 0) {
      return res.status(400).json({ message: "Short URL required" });
    }

    const cachedUrl = await redis.get(shorturl)

    if(cachedUrl){
      console.log('from redis')
      return res.status(302).redirect(cachedUrl);
    }

    const response = await prisma.url.findUnique({
      where: {
        shortUrl: shorturl,
      },
    });

    if (!response) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    redis.set(shorturl,response.originalUrl,{ex:60*60*24})

    res.status(302).redirect(response.originalUrl);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export default getOriginalUrl;
