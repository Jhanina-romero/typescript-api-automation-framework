import { BookingClient } from '../../../src/restful-booker/clients/BookingClient';
import { AuthClient } from '../../../src/restful-booker/clients/AuthClient';
import { BookingFactory } from '../../../src/factories/booking.factory';

describe('POST /booking', () => {
    const bookingClient = new BookingClient();
    let bookingId: number;
    let response: any;
    const authClient = new AuthClient();
    let token: string;
    let bookingDeleted = false;

    beforeEach(async () => {
        const authResponse = await authClient.createToken({
            username: 'admin',
            password: 'password123'
        });

        token = authResponse.data.token;
        const booking = BookingFactory.createBooking();
        response = await bookingClient.createBooking(booking);
        bookingId = response.data.bookingid;
    });

    afterEach(async () => {
        if (bookingId && !bookingDeleted) {
            await bookingClient.deleteBooking(bookingId, token);
        }
    });

    test('should create a new booking', async () => {
        expect(response.status).toBe(200);
    });
});