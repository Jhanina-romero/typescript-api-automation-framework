import { BookingClient } from '../../../src/restful-booker/clients/BookingClient';
import { AuthClient } from '../../../src/restful-booker/clients/AuthClient';

describe('PATCH /booking/:id', () => {
    const bookingClient = new BookingClient();
    const authClient = new AuthClient();

    test('should partially update an existing booking', async () => {
        const authResponse = await authClient.createToken({
            username: 'admin',
            password: 'password123'
        });

        const token = authResponse.data.token;

        const partialUpdate = {
            firstname: 'UpdatedFirstName',
            lastname: 'UpdatedLastName'
        };
        const bookingId = 1;

        const response = await bookingClient.patchBooking(bookingId, partialUpdate, token);

        expect(response.status).toBe(200);
    });
});