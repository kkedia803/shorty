import redis from "../config/redis.js";

const rateLimiter = async (req, res, next) => {
  try {
    const clientIp = req.ip;

    let count = await redis.incr(`rate:${clientIp}`);

    if (count === 1) {
      await redis.expire(`rate:${clientIp}`, Number(process.env.WINDOW));
    }

    if (count > Number(process.env.LIMIT)) {
      return res
        .status(429)
        .json({ message: "Too Many Requests! Try again after some time" });
    }

    next();
  } catch (err) {
    console.error("Rate limiter failed:", err);
    next();
  }
};

export default rateLimiter;
