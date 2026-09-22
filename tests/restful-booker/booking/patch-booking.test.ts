import { BookingClient } from '../../../src/restful-booker/clients/BookingClient';
import { TestDataManager } from '../../../src/utils/TestDataManager';
import { JsonSchemaValidator } from '../../../src/validator/JsonSchemaValidator';
import { bookingSchema } from '../../../src/restful-booker/schemas/booking.schema';
import * as allure from 'allure-js-commons';

describe('PATCH /booking/:id', () => {
    const bookingClient = new BookingClient();
    const testDataManager = new TestDataManager();
    const validator = new JsonSchemaValidator();
    let bookingId: number | undefined;
    let token: string;

    beforeAll(async () => {
        await allure.epic('Restful Booker API');
        await allure.feature('Booking API');
        await allure.story('Patch Booking');
        await allure.severity('critical');
    });

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

        let response = await bookingClient.patchBooking(bookingId!, partialUpdate, token);

        await allure.step('Send GET request', async () => {
            response;
        });

        await allure.step('Validate HTTP status', async () => {
            expect(response.status).toBe(200);
        });

        await allure.step('Validate response schema', async () => {
            validator.validate(response.data, bookingSchema);
        });
    });
});