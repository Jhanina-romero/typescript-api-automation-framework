import winston from 'winston';
import { loggerConfig } from './logger.config';
import { truncate } from './logger.utils';

export interface LogRequest {
    method: string;
    url?: string;
    headers?: unknown;
    params?: unknown;
    body?: unknown;
}

export interface LogResponse {
    method: string;
    url?: string;
    status: number;
    duration?: number;
    body?: unknown;
}

export interface LogError {
    method?: string;
    url?: string;
    status?: number;
    duration?: number;
    message: string;
    body?: unknown;
}

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

    static request(data: LogRequest): void {
        this.logger.http('HTTP Request', {
            method: data.method,
            url: data.url,
            body: truncate(data.body, 150)
        });
    }

    static response(data: LogResponse): void {
        this.logger.http('HTTP Response', {
            method: data.method,
            url: data.url,
            status: data.status,
            duration: data.duration
        });
    }

    static requestError(data: LogError): void {
        this.logger.error('HTTP Error', {
            url: data.url,
            status: data.status,
            message: data.message
        });
    }

}