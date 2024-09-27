import { Logger, transports, createLogger, format } from 'winston';
import LokiTransport from 'winston-loki';

const customFormat = format.printf(({ level, message, timestamp }) => {
    const logLevel = level.charAt(0).toUpperCase() + level.slice(1);
    const time = new Date(timestamp).toISOString().replace('T', ' ').replace('Z', '');
    return `${time} [${logLevel}] ${message}`;
});

export const logger: Logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.timestamp(),
        customFormat
    ),
    transports: [
        new transports.Console(),
        new LokiTransport({
            host: process.env.LOKI_HOST || 'http://loki:3100',
            json: true,
            labels: { service: 'my-express-app' },
        })
    ],
});