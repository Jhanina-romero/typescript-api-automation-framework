import winston from 'winston';
import { loggerConfig } from './logger.config';

export class Logger {

    private static logger = winston.createLogger(
        loggerConfig
    );

    static info(message: string, meta?: unknown): void {
        this.logger.info(message, meta);
    }

    static warn(message: string, meta?: unknown): void {
        this.logger.warn(message, meta);
    }

    static error(message: string, meta?: unknown): void {
        this.logger.error(message, meta);
    }

    static http(message: string, meta?: unknown): void {
        this.logger.http(message, meta);
    }

    static debug(message: string, meta?: unknown): void {
        this.logger.debug(message, meta);
    }
}