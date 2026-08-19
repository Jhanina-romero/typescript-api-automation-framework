import { BookingClient } from '../../../src/restful-booker/clients/BookingClient';
import { TestDataManager } from '../../../src/utils/TestDataManager';
import { JsonSchemaValidator } from '../../../src/validator/JsonSchemaValidator';
import { bookingSchema } from '../../../src/restful-booker/schemas/booking.schema';

describe('PATCH /booking/:id', () => {
    const bookingClient = new BookingClient();
    const testDataManager = new TestDataManager();
    const validator = new JsonSchemaValidator();
    let bookingId: number | undefined;
    let token: string;

    beforeEach(async () => {
        token = await testDataManager.createAuthToken('admin', 'password123');
        await testDataManager.createBooking();
        bookingId = await testDataManager.getBookingId() as number;
    });

    afterEach(async () => {
        testDataManager.cleanup();
    });

    test('should partially update an existing booking', async () => {
        const partialUpdate = {
            firstname: 'UpdatedFirstName',
            lastname: 'UpdatedLastName'
        };

        const response = await bookingClient.patchBooking(bookingId!, partialUpdate, token);

        expect(response.status).toBe(200);
        validator.validate(response.data, bookingSchema);
    });
});