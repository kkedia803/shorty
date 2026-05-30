import express from 'express';
const shortRouter = express.Router();
import shortenUrl from '../services/shortenUrl.service.js';
import getOriginalUrl from '../services/getUrl.service.js';

shortRouter.post('/shorturl',shortenUrl);

shortRouter.get('/:shorturl',getOriginalUrl);

export default shortRouter;