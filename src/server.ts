import 'reflect-metadata';
import '@middlewares/authentication.middleware';
import * as bodyParser from 'body-parser';
import loggerMiddleware from '@middlewares/logger.middleware';
import OctaDeskController from '@controllers/octaDesk.controller';
import errorHandlerMiddleware from '@middlewares/errorHandler.middleware';
import IndexController from '@controllers/index.controller';
import LeadsController from '@controllers/leads.controller';
import { createConnections } from 'typeorm/index';
import App from './app';

createConnections().then(() => {
  const app = new App({
    port: 3000,
    hostname: process.env.NODE_ENV === 'production' ? '<IP da maquina>' : 'localhost',
    controllers: [
      new OctaDeskController(),
      new IndexController(),
      new LeadsController(),
    ],
    middleWares: [
      bodyParser.json(),
      bodyParser.urlencoded({ extended: true }),
      loggerMiddleware,
    ],
    errorHandlers: [
      errorHandlerMiddleware,
    ],

  });

  app.listen();
});
