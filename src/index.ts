import 'dotenv/config';
import express, { Application } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import { router } from '@/routes';
import cors from 'cors';
import logger from './utils/logger';

const app: Application = express();
const port = process.env.PORT;

process.on('uncaughtException', function (err) {
  console.error(err.stack);
});

process.on('SIGTERM', (signal) => {
  console.log(`Process ${process.pid} received a SIGTERM signal`);
  process.exit(0);
});

process.on('SIGINT', (signal) => {
  console.log(`Process ${process.pid} has been interrupted`);
  process.exit(0);
});

app.use(cors());
app.use(compression());
app.use(helmet());
app.disable('x-powered-by');
app.use(express.json());
app.use(router);

app.listen(port, () => logger.info(`Server is up and running on port:${port}`));
