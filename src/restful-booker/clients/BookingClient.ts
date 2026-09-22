import { AxiosRequestConfig } from 'axios';

import { HttpClient } from '../../core/http/HttpClient';

import {
  Booking,
  CreateBookingResponse
} from '../models/Booking';

export class BookingClient {

  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  async getBookings() {
    return this.httpClient.get('/booking');
  }

  async getBooking(id: number) {
    return this.httpClient.get<Booking>(
      `/booking/${id}`
    );
  }

  async createBooking(
    booking: Booking
  ) {
    return this.httpClient.post<CreateBookingResponse>(
      '/booking',
      booking
    );
  }

  async updateBooking(
    id: number,
    booking: Booking,
    token?: string,
    requestConfig?: AxiosRequestConfig
  ) {
    const config: AxiosRequestConfig = {
      ...requestConfig,
      headers: {
        ...(requestConfig?.headers ?? {}),
        ...(token ? { Cookie: `token=${token}` } : {})
      }
    };

    return this.httpClient.put<Booking>(
      `/booking/${id}`,
      booking,
      config
    );
  }

  async patchBooking(
    id: number,
    booking: Partial<Booking>,
    token?: string,
    requestConfig?: AxiosRequestConfig
  ) {
    const config: AxiosRequestConfig = {
      ...requestConfig,
      headers: {
        ...(requestConfig?.headers ?? {}),
        ...(token ? { Cookie: `token=${token}` } : {})
      }
    };

    return this.httpClient.patch<Booking>(
      `/booking/${id}`,
      booking,
      config
    );
  }

  async deleteBooking(
    id: number,
    token?: string
  ) {
    return this.httpClient.delete(
      `/booking/${id}`,
      token ? {
        headers: {
          Cookie: `token=${token}`
        }
      } : undefined
    );
  }
}