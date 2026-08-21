import {
    AxiosError,
    AxiosInstance
} from 'axios';

import { Logger } from '../../logger/Logger';

interface RequestMetadata {
    startTime: number;
}

declare module 'axios' {
    export interface AxiosRequestConfig {
        metadata?: RequestMetadata;
    }
}

export function setupLoggingInterceptors(
    client: AxiosInstance,
    logger: typeof Logger
): void {

    client.interceptors.request.use(
        (config) => {

            config.metadata = {
                startTime: Date.now()
            };

            logger.request({
                method:
                    config.method?.toUpperCase()
                    ?? 'UNKNOWN',
                url: config.url,
                headers: config.headers,
                params: config.params,
                body: config.data
            });

            return config;
        }
    );

    client.interceptors.response.use(

        (response) => {

            const startTime =
                response.config.metadata?.startTime;

            const duration =
                startTime
                    ? Date.now() - startTime
                    : undefined;

            logger.response({
                method:
                    response.config.method?.toUpperCase()
                    ?? 'UNKNOWN',
                url: response.config.url,
                status: response.status,
                duration,
                body: response.data
            });

            return response;
        },

        (error: AxiosError) => {

            const startTime = error.config?.metadata?.startTime;

            const duration =
                startTime
                    ? Date.now() - startTime
                    : undefined;

            logger.requestError({
                method: error.config?.method?.toUpperCase(),
                url: error.config?.url,
                status: error.response?.status,
                duration,
                message: error.message,
                body: error.response?.data
            });

            return Promise.reject(error);
        }
    );
}