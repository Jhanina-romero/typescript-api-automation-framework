import { BookingClient } from '../../../src/restful-booker/clients/BookingClient';
import { TestDataManager } from '../../../src/utils/TestDataManager';
import { JsonSchemaValidator } from '../../../src/validator/JsonSchemaValidator';
import { bookingSchema } from '../../../src/restful-booker/schemas/booking.schema';

describe('GET /booking/{id}', () => {
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

  test('should return booking information', async () => {
    const response = await bookingClient.getBooking(bookingId!);

    expect(response.status).toBe(200);
    console.log(response.data);
    validator.validate(response.data, bookingSchema);
  });

});