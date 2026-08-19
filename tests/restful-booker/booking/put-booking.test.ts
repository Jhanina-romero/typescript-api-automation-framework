import { BookingClient } from '../../../src/restful-booker/clients/BookingClient';
import { TestDataManager } from '../../../src/utils/TestDataManager';
import { JsonSchemaValidator } from '../../../src/validator/JsonSchemaValidator';
import { bookingSchema } from '../../../src/restful-booker/schemas/booking.schema';

describe('PUT /booking/:id', () => {
    const testDataManager = new TestDataManager();
    const bookingClient = new BookingClient();
    const validator = new JsonSchemaValidator();
    let bookingId: number;
    let token: string;

    beforeEach(async () => {
        token = await testDataManager.createAuthToken('admin', 'password123');
        await testDataManager.createBooking();
        bookingId = await testDataManager.getBookingId() as number;
    });

    afterEach(async () => {
        testDataManager.cleanup();
    });

    test('should update an existing booking', async () => {
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
        validator.validate(response.data, bookingSchema);

    });
});