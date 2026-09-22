import { BookingClient } from '../../../src/restful-booker/clients/BookingClient';
import { TestDataManager } from '../../../src/utils/TestDataManager';
import { JsonSchemaValidator } from '../../../src/validator/JsonSchemaValidator';
import { createBookingResponseSchema } from '../../../src/restful-booker/schemas/create-booking-response.schema';
import * as allure from 'allure-js-commons';

describe('POST /booking', () => {
    const testDataManager = new TestDataManager();
    const bookingClient = new BookingClient();
    const validator = new JsonSchemaValidator();
    let token: string;

    beforeAll(async () => {
        await allure.epic('Restful Booker API');
        await allure.feature('Booking API');
        await allure.story('Create Booking');
        await allure.severity('critical');
    });

    beforeEach(async () => {
        token = await testDataManager.createAuthToken('admin', 'password123');
        await testDataManager.createBooking();
    });

    afterEach(async () => {
        testDataManager.cleanup();
    });

    test('should create a new booking', async () => {
        let response = await testDataManager.getBookingResponse();

        await allure.step('Send GET request', async () => {
            response = await testDataManager.getBookingResponse();
        });

        await allure.step('Validate HTTP status', async () => {
            expect(response.status).toBe(200);
        });

        await allure.step('Validate response schema', async () => {
            validator.validate(response.data, createBookingResponseSchema);
        });

    });
});