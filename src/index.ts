import dotenv from 'dotenv';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/paymentRoutes';

dotenv.config();

const app = express();
const port: number = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});