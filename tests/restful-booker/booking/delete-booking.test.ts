import { AuthClient } from '../../../src/restful-booker/clients/AuthClient';
import { BookingClient } from '../../../src/restful-booker/clients/BookingClient';

describe('DELETE /booking/:id', () => {
  const bookingClient = new BookingClient();

  test('should delete an existing booking', async () => {
    const authClient = new AuthClient();

    const authResponse = await authClient.createToken({
            username: 'admin',
            password: 'password123'
        });

        const token = authResponse.data.token;

        const bookingId = 1;

        const response = await bookingClient.deleteBooking(bookingId, token);

        expect(response.status).toBe(201);
  });
});