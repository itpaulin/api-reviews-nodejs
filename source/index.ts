import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import rootRouter from './routes/index';
import { PORT } from './secrets';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middlewares/errors';

const app: Express = express();

// Utiliza o middleware 'morgan' para logar as requisições HTTP no ambiente de desenvolvimento
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Configura os cabeçalhos de controle de acesso CORS
app.use((req, res, next) => {
  // Permite que qualquer origem acesse a API
  res.header('Access-Control-Allow-Origin', '*');

  // Define os cabeçalhos que a API pode receber
  res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With, Content-Type, Accept, Authorization');

  // Se o método da requisição for 'OPTIONS', define os métodos que a API permite e retorna uma resposta vazia
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

app.use('/', rootRouter);

export const prismaClient = new PrismaClient({
  log: ['query']
});

app.use(errorMiddleware);

const httpServer = http.createServer(app);
const serverPort: number | string = PORT || 3000;
httpServer.listen(serverPort, () => console.log(`Server is running on port ${serverPort}`));
