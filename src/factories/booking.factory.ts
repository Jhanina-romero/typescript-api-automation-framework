import { Booking } from '../restful-booker/models/Booking';

export class BookingFactory {

    static createBooking(): Booking {

        const timestamp = Date.now();

        return {
            firstname: `Test${timestamp}`,
            lastname: 'User',
            totalprice: 150,
            depositpaid: true,
            bookingdates: {
                checkin: '2025-01-01',
                checkout: '2025-01-05'
            },
            additionalneeds: 'Breakfast'
        };
    }
}