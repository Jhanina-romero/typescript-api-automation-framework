import { BookingClient } from '../../../src/restful-booker/clients/BookingClient';
import { TestDataManager } from '../../../src/utils/TestDataManager';

describe('GET /booking/{id}', () => {
  const bookingClient = new BookingClient();
  const testDataManager = new TestDataManager();
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
    expect(response.data).toHaveProperty('firstname');
    expect(response.data).toHaveProperty('lastname');
    expect(response.data).toHaveProperty('totalprice');
    expect(response.data).toHaveProperty('depositpaid');
    expect(response.data).toHaveProperty('bookingdates');
  });

});