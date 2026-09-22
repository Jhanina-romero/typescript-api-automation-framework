import { BookingClient } from '../../../src/restful-booker/clients/BookingClient';
import { TestDataManager } from '../../../src/utils/TestDataManager';
import { JsonSchemaValidator } from '../../../src/validator/JsonSchemaValidator';
import { deleteBookingSchema } from '../../../src/restful-booker/schemas/delete-booking.schema';
import * as allure from 'allure-js-commons';

describe('DELETE /booking/:id', () => {
  const bookingClient = new BookingClient();
  const testDataManager = new TestDataManager();
  const validator = new JsonSchemaValidator();
  let bookingId: number | undefined;
  let token: string;
  let bookingDeleted = false;

  beforeAll(async () => {
    await allure.epic('Restful Booker API');
    await allure.feature('Booking API');
    await allure.story('Delete Booking');
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

  test('should delete an existing booking', async () => {
    let response = await bookingClient.deleteBooking(bookingId!, token);

    await allure.step('Send GET request', async () => {
      response;
    });

    await allure.step('Validate HTTP status', async () => {
      expect(response.status).toBe(201);
    });

    await allure.step('Validate response schema', async () => {
      validator.validate(response.data, deleteBookingSchema);
      testDataManager.setBookingDeleted(true);
    });
  });
});