import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import { router as routes } from './routes/index';
import { PORT } from './secrets';

const router: Express = express();

router.use(morgan('dev'));

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(express.static('public'));
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

router.use('/', routes);

router.use((req, res, next) => {
  const error = new Error('Not found');
  return res.status(404).json({
    message: error.message
  });
});

const httpServer = http.createServer(router);
const serverPort: number | string = PORT || 3000;
httpServer.listen(serverPort, () =>
  console.log(`Server is running on port ${serverPort}`)
);
