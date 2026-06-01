import express from 'express';
const app = express();
import shortRouter from './routes/url.routes.js';
import cors from 'cors';

app.set("trust proxy", 1);
app.use(express.json())
app.use(cors({origin:'*'}));

app.get('/health',(req,res)=>{
    res.status(200).json({message:'working fine'})
})

app.use('/', shortRouter)

export default app;