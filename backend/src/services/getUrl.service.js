import pkg from "@prisma/client";

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const getOriginalUrl = async (req, res) => {
  try {
    const { shorturl } = req.params;

    if (!shorturl || shorturl.length === 0) {
      return res.status(400).json({ message: "Short URL required" });
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

    res.status(302).redirect(response.originalUrl);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export default getOriginalUrl;
