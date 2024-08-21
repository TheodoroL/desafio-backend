import express from 'express'; 
import { routers } from './routes/routes';
import cors from 'cors'; 
import { Service } from './Service/Service';
import { CronJob } from 'cron';
import { init } from './sequelize.config';
import dotenv from 'dotenv'; 
dotenv.config({path:'./src/.env'}); 
init(); 

const service = new Service()
const job = new CronJob('* * * * *', async () => {
   await service.deleteUrl(); 
 })
const server = express(); 
server.use(cors({origin: "*"})); 
server.use(express.json());
server.use(routers); 
job.start(); 
server.listen(process.env.PORT, ()=> console.log('server run')); 
