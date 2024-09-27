import { Application }  from "express";
import { json } from "express";
import {logger} from "./logging/loggerv2";
import promClient from 'prom-client';

export default function main(app: Application) {
    const collectDefaultMetrics = promClient.collectDefaultMetrics;
    const register = new promClient.Registry();
    collectDefaultMetrics({ register });

    const httpRequestsTotal = new promClient.Counter({
        name: 'http_requests_total',
        help: 'Total number of HTTP requests',
        labelNames: ['method', 'path', 'status'],
        registers: [register]
    });

    const httpRequestDuration = new promClient.Gauge({
        name: 'http_request_duration_seconds',
        help: 'Duration of HTTP requests in seconds',
        labelNames: ['method', 'path'],
        registers: [register]
    });
    app.use(json());

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', `${process.env.HOST_URL}`);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    app.use((req, res, next) => {
        const start = process.hrtime();
        if (req.method === 'GET') {
            logger.debug(`${req.method} ${req.url}`);
        } else {
            logger.debug(`${req.method} ${req.url} ${JSON.stringify(req.body)}`);
        }
    
        res.on('finish', () => {
            const duration = process.hrtime(start);
            const durationInSeconds = duration[0] + duration[1] / 1e9;

            httpRequestDuration.set(
            {
                method: req.method,
                path: req.path
            },
            durationInSeconds
            );

            const labels = {
            method: req.method,
            path: req.path,
            status: res.statusCode
            };

            httpRequestsTotal.inc(labels);
        });
        next();
    });


    app.get('/metrics', async (req, res) => {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    });
}