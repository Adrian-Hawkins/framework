import express from 'express';
import { registerControllers } from './server';
import { Logger } from './logging/logger';
import {logRequest} from "./MiddleWare";
import {
  HelloController
} from './controllers';
const port = 3000;
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `${process.env.HOST_URL}`);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(logRequest);

registerControllers(app, [
  HelloController
]);
app.listen(port, () => {
  Logger.info(`Server is running on http://localhost:${port}`);
});
