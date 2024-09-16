import express from 'express';
import rateLimit  from 'express-rate-limit';
import { registerControllers } from './server';
import { Logger } from './logging/logger';
import {logRequest} from "./MiddleWare";
import {
  HelloController,
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

app.use(rateLimit({
  windowMs: 60 * 1000,
  limit: 100,
  message: "You have exceeded your 100 requests per minute limit."
}));
app.use(logRequest);

registerControllers(app, [
  HelloController
]);
app.listen(port, () => {
  Logger.info(`Server is running on http://localhost:${port}`);
});
