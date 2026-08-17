import { AuthClient } from '../../../src/restful-booker/clients/AuthClient';
import { BookingClient } from '../../../src/restful-booker/clients/BookingClient';
import { BookingFactory } from '../../../src/factories/booking.factory';

describe('PUT /booking/:id', () => {
    const bookingClient = new BookingClient();
    let bookingId: number;
    const authClient = new AuthClient();
    let token: string;

    beforeEach(async () => {
        const authResponse = await authClient.createToken({
            username: 'admin',
            password: 'password123'
        });

        token = authResponse.data.token;

        const booking =
            BookingFactory.createBooking();

        const response =
            await bookingClient.createBooking(booking);

        bookingId =
            response.data.bookingid;
    });

    afterEach(async () => {

        if (bookingId) {
            await bookingClient.deleteBooking(bookingId, token);
        }
    });

    it('should update an existing booking', async () => {
        const updatedBooking = {
            firstname: 'Jane',
            lastname: 'Smith',
            totalprice: 200,
            depositpaid: false,
            bookingdates: {
                checkin: '2023-02-01',
                checkout: '2023-02-10'
            },
            additionalneeds: 'Lunch'
        };

        const response = await bookingClient.updateBooking(bookingId, updatedBooking, token);

        expect(response.status).toBe(200);
        expect(response.data).toEqual(updatedBooking);
    
    });
});