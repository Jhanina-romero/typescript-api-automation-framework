import { BookingClient } from '../../../src/restful-booker/clients/BookingClient';

describe('POST /booking', () => {
    const bookingClient = new BookingClient();

    test('should create a new booking', async () => {
        const newBooking = {
            firstname: 'John',
            lastname: 'Doe',
            totalprice: 150,
            depositpaid: true,
            bookingdates: {
                checkin: '2023-01-01',
                checkout: '2023-01-10'
            },
            additionalneeds: 'Breakfast'
        };
        const response = await bookingClient.createBooking(newBooking);
        expect(response.status).toBe(200);
    });
});