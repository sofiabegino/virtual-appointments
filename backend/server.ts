
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { IUser } from './interfaces';
import { routerApi } from './routes';
import './utils/auth'
import cors from 'cors';
import { logErrors,errorHandler ,boomErrorHandler} from './middlewares/error.handler';

dotenv.config();

require('./utils/auth');

const app: Express = express();
const port = process.env.PORT;

// const whitelist = ['http://localhost:3001'];
// const options = {
//   origin: (origin:any, callback:any) => {
//     if (whitelist.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('no permitido'));
//     }
//   }
// }
app.use(cors()) 

app.use(express.json());

routerApi(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});


app.get('/', (req: Request, res: Response) => {
    res.send('App Works !!!!');
});


app.use(logErrors);

app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

