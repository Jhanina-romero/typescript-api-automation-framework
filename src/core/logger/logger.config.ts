import { format, transports } from 'winston';
import path from 'path';

const { combine, timestamp, printf, json } = format;

const consoleFormat = printf(({ timestamp, level, message }) => {
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
});

export const loggerConfig = {
    level: 'http',
    format: combine(
        timestamp(),
        json()
    ),

    transports: [
        new transports.Console({
            level: 'http',
            format: combine(
                timestamp(),
                consoleFormat
            )
        }),

        new transports.File({
            filename: path.join(
                process.cwd(),
                'logs',
                'api.log'
            ),
            level: 'http'
        }),

        new transports.File({
            filename: path.join(
                process.cwd(),
                'logs',
                'error.log'
            ),
            level: 'error'
        })
    ]
};