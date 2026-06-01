import express from 'express';
const shortRouter = express.Router();
import shortenUrl from '../services/shortenUrl.service.js';
import getOriginalUrl from '../services/getUrl.service.js';
import rateLimiter from '../middleware/rateLimiter.js';

shortRouter.post('/shorturl',rateLimiter, shortenUrl);

shortRouter.get('/:shorturl',getOriginalUrl);

export default shortRouter;