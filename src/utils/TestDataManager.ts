import { AuthClient } from '../restful-booker/clients/AuthClient';
import { BookingClient } from '../restful-booker/clients/BookingClient';
import { BookingFactory } from '../factories/booking.factory';

export class TestDataManager {
    private authClient!: AuthClient;
    private bookingClient!: BookingClient;
    private token: string | null = null;
    private bookingId: number | null = null;
    private bookingDeleted = false;
    private response: any;

    constructor() {
        this.authClient = new AuthClient();
        this.bookingClient = new BookingClient();
    }

    async createAuthToken(username: string, password: string): Promise<string> {
        const authResponse = await this.authClient.createToken({ username, password });
        this.token = authResponse.data.token;

        return this.token;
    }

    async createBooking(): Promise<void> {
        if (!this.token) {
            throw new Error('Auth token is not available. Please create an auth token first.');
        }

        const booking = BookingFactory.createBooking();
        this.response = await this.bookingClient.createBooking(booking);
        this.bookingId = this.response.data.bookingid;
    }

    async getBookingResponse(): Promise<any> {
        if (!this.bookingId) {
            throw new Error('Booking ID is not available. Please create a booking first.');
        }
        return await this.response;
    }

    async getBookingId(): Promise<number | null> {
        if (!this.token) {
            throw new Error('Auth token is not available. Please create an auth token first.');
        }

        return this.bookingId;
    }

    async getBookingDeleted(): Promise<boolean> {
        if (!this.token) {
            throw new Error('Auth token is not available. Please create an auth token first.');
        }

        return this.bookingDeleted;
    }

    async setBookingDeleted(deleted: boolean): Promise<void> {
        if (!this.token) {
            throw new Error('Auth token is not available. Please create an auth token first.');
        }

        this.bookingDeleted = deleted;
    }

    async cleanup(): Promise<void> {
        if (!this.bookingDeleted && this.token && this.bookingId !== null) {
            await this.bookingClient.deleteBooking(this.bookingId, this.token);
            this.bookingDeleted = true;
        }
    }

}