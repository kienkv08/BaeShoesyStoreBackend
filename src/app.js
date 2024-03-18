import express, { json, urlencoded } from 'express';
import Config from './config/common.config.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { BASE_URL } from './common/constants/global.const.js';
import routes from './routes/index.router.js';
import connectDB from './config/mongo.config.js';
import LogService from './config/log.config.js';
import { handleAppError, handleError } from './middlewares/error.handling.middleware.js';
import { AppError, ManagedError } from './models/error.model.js';

dotenv.config();
const app = express();
app.use(json({ limit: Config.LIMIT_REQUEST_BODY }));
app.use(
  urlencoded({
    extended: true,
    limit: Config.LIMIT_REQUEST_BODY,
  }),
);
app.use(cors({ credentials: true, preflightContinue: true }));
app.use(cookieParser());

const v1Router = express.Router();

v1Router.use(cookieParser());
v1Router.use(express.json());
v1Router.use(bodyParser.urlencoded({ extended: false }));
app.use(BASE_URL, v1Router);

routes(v1Router);

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    handleAppError(req, res)(err);
  } else {
    handleError(req, res)(err);
  }
});

setImmediate(async () => {
  connectDB();

  const server =
    Config.NODE_ENV === 'production'
      ? https.createServer(options, app).listen(Config.APP_PORT, () => {
          LogService.logInfo('App listening on', `${Config.APP_HOST}`);
        })
      : app.listen(Config.APP_PORT, () => {
          LogService.logInfo('App listening on', `${Config.APP_HOST}`);
        });

  process.on('SIGTERM', () => {
    LogService.logInfo('SIGTERM signal received: closing HTTP server');
    deleteExpiredVoucherJob.stop();
    io.close(() => {
      LogService.logInfo('SOCKET', 'Shutdown socket server');
    });
    server.close(() => {
      LogService.logInfo('HTTP server closed');
    });
  });
});
