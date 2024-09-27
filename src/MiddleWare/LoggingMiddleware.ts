import { Request, Response, NextFunction } from 'express';
import {logger} from "../logging/loggerv2";
// import { httpRequestDurationMicroseconds, totalHttpRequests } from '../prometheus/metrics';

export function buildLoggingMiddleware() {


  return function logRequest(req: Request, res: Response, next: NextFunction) {
    // const start = process.hrtime();
    if (req.method === 'GET') {
      logger.debug(`${req.method} ${req.url}`);
    } else {
      logger.debug(`${req.method} ${req.url} ${JSON.stringify(req.body)}`);
    }

    // res.on('finish', () => {
    //   const duration = process.hrtime(start);
    //   const durationInSeconds = duration[0] + duration[1] / 1e9;

    //   httpRequestDurationMicroseconds
    //     .labels(req.method, req.path, res.statusCode.toString())
    //     .observe(durationInSeconds);

    //   totalHttpRequests
    //     .labels(req.method, req.path, res.statusCode.toString())
    //     .inc();
    // });
    next();
  }
}
