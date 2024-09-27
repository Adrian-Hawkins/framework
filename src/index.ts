import express from 'express';
import { registerControllers } from './server';
import {
  HelloController
} from './controllers';
import {logger} from "./logging/loggerv2";
import main from './std_main';


const port = 3001;
const app = express();
main(app);

registerControllers(app, [
  HelloController
]);
app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
