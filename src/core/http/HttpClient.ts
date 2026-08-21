import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

import { config } from '../config/config';
import { Logger } from '../logger/Logger';

interface RequestMetadata {
    startTime: number;
}

declare module 'axios' {
    export interface AxiosRequestConfig {
        metadata?: RequestMetadata;
    }
}

export class HttpClient {

  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    this.setupInterceptors();
  }

  private setupInterceptors(): void {

    this.client.interceptors.request.use(
        (config) => {

            config.metadata = {
                startTime: Date.now()
            };

            Logger.request({
                method:
                    config.method?.toUpperCase()
                    ?? 'UNKNOWN',

                url:
                    config.url,

                headers:
                    config.headers,

                params:
                    config.params,

                body:
                    config.data
            });

            return config;
        }
    );

    this.client.interceptors.response.use(

        (response) => {

            const startTime =
                response.config.metadata?.startTime;

            const duration =
                startTime
                    ? Date.now() - startTime
                    : undefined;

            Logger.response({
                method:
                    response.config.method?.toUpperCase()
                    ?? 'UNKNOWN',

                url:
                    response.config.url,

                status:
                    response.status,

                duration,

                body:
                    response.data
            });

            return response;
        },

        (error) => {

            const startTime =
                error.config?.metadata?.startTime;

            const duration =
                startTime
                    ? Date.now() - startTime
                    : undefined;

            Logger.requestError({
                method:
                    error.config?.method?.toUpperCase(),

                url:
                    error.config?.url,

                status:
                    error.response?.status,

                duration,

                message:
                    error.message,

                body:
                    error.response?.data
            });

            return Promise.reject(error);
        }
    );
}

  async get<T>(
    endpoint: string,
    requestConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.get<T>(
      endpoint,
      requestConfig
    );
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    requestConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.post<T>(
      endpoint,
      data,
      requestConfig
    );
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    requestConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.put<T>(
      endpoint,
      data,
      requestConfig
    );
  }

  async patch<T>(
    endpoint: string,
    data?: unknown,
    requestConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(
      endpoint,
      data,
      requestConfig
    );
  }

  async delete<T>(
    endpoint: string,
    requestConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(
      endpoint,
      requestConfig
    );
  }
}