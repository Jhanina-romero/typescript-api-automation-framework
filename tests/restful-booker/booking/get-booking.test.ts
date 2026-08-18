import { BookingClient } from '../../../src/restful-booker/clients/BookingClient';
import { AuthClient } from '../../../src/restful-booker/clients/AuthClient';
import { BookingFactory } from '../../../src/factories/booking.factory';

describe('GET /booking/{id}', () => {
  const bookingClient = new BookingClient();
  let bookingId: number;
  const authClient = new AuthClient();
  let token: string;
  let bookingDeleted = false;

  beforeEach(async () => {
    const authResponse = await authClient.createToken({
      username: 'admin',
      password: 'password123'
    });

    token = authResponse.data.token;
    const booking = BookingFactory.createBooking();
    const response = await bookingClient.createBooking(booking);
    bookingId = response.data.bookingid;
  });

  afterEach(async () => {
    if (bookingId && !bookingDeleted) {
      await bookingClient.deleteBooking(bookingId, token);
    }
  });

  test('should return booking information', async () => {
    const response = await bookingClient.getBooking(bookingId);

    expect(response.status).toBe(200);

    expect(response.data).toHaveProperty('firstname');
    expect(response.data).toHaveProperty('lastname');
    expect(response.data).toHaveProperty('totalprice');
    expect(response.data).toHaveProperty('depositpaid');
    expect(response.data).toHaveProperty('bookingdates');
  });

});