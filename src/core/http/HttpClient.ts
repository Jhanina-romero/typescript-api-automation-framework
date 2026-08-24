import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

import { config } from '../config/config';
import { Logger } from '../logger/Logger';
import { setupLoggingInterceptors } from './interceptors/LoggingInterceptor';

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
    setupLoggingInterceptors(this.client, Logger);
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