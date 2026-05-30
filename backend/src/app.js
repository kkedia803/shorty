import express from 'express';
const app = express();
import shortRouter from './routes/url.routes.js';
import cors from 'cors';

app.use(express.json())
app.use(cors({origin:'*'}));

app.use('/', shortRouter)

app.get('/health',(req,res)=>{
    res.json('working fine')
})

export default app;