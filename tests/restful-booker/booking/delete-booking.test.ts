import { AuthClient } from '../../../src/restful-booker/clients/AuthClient';
import { BookingClient } from '../../../src/restful-booker/clients/BookingClient';
import { BookingFactory } from '../../../src/factories/booking.factory';

describe('DELETE /booking/:id', () => {
  const bookingClient = new BookingClient();
  let bookingId: number | undefined;
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

  test('should delete an existing booking', async () => {
    const response = await bookingClient.deleteBooking(bookingId!, token);

    expect(response.status).toBe(201);
    bookingDeleted = true;
  });
});