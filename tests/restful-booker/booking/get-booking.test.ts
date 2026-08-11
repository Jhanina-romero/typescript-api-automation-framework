import { BookingClient } from '../../../src/restful-booker/clients/BookingClient';

describe('GET /booking/{id}', () => {

  const bookingClient = new BookingClient();

  test('should return booking information', async () => {
    const response = await bookingClient.getBooking(1);

    expect(response.status).toBe(200);

    expect(response.data).toHaveProperty('firstname');
    expect(response.data).toHaveProperty('lastname');
    expect(response.data).toHaveProperty('totalprice');
    expect(response.data).toHaveProperty('depositpaid');
    expect(response.data).toHaveProperty('bookingdates');
  });

});