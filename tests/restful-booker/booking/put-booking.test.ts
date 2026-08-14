import { AuthClient } from '../../../src/restful-booker/clients/AuthClient';
import { BookingClient } from '../../../src/restful-booker/clients/BookingClient';

describe('PUT /booking/:id', () => {
    const bookingClient = new BookingClient();

    test('should update an existing booking', async () => {
        const authClient = new AuthClient();

        const authResponse = await authClient.createToken({
            username: 'admin',
            password: 'password123'
        });

        const token = authResponse.data.token;

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
        const bookingId = 1;

        const response = await bookingClient.updateBooking(bookingId, updatedBooking, token);

        expect(response.status).toBe(200);
        expect(response.data).toEqual(updatedBooking);
    });
});