import { BookingClient } from '../../../src/restful-booker/clients/BookingClient';
import { TestDataManager } from '../../../src/utils/TestDataManager';
import { JsonSchemaValidator } from '../../../src/validator/JsonSchemaValidator';
import { deleteBookingSchema } from '../../../src/restful-booker/schemas/delete-booking.schema';

describe('DELETE /booking/:id', () => {
  const bookingClient = new BookingClient();
  const testDataManager = new TestDataManager();
  const validator = new JsonSchemaValidator();
  let bookingId: number | undefined;
  let token: string;
  let bookingDeleted = false;

  beforeEach(async () => {
    token = await testDataManager.createAuthToken('admin', 'password123');
    await testDataManager.createBooking();
    bookingId = await testDataManager.getBookingId() as number;
  });

  afterEach(async () => {
    testDataManager.cleanup();
  });

  test('should delete an existing booking', async () => {
    const response = await bookingClient.deleteBooking(bookingId!, token);

    expect(response.status).toBe(201);
    validator.validate(response.data, deleteBookingSchema);
    bookingDeleted = true;
  });
});