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
    booking: Booking
  ) {
    return this.httpClient.put<Booking>(
      `/booking/${id}`,
      booking
    );
  }

  async deleteBooking(
    id: number
  ) {
    return this.httpClient.delete(
      `/booking/${id}`
    );
  }
}