import { BookingClient } from '../../../src/restful-booker/clients/BookingClient';
import { TestDataManager } from '../../../src/utils/TestDataManager';

describe('POST /booking', () => {
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

    test('should create a new booking', async () => {
        const response = await testDataManager.getBookingResponse();
        expect(response.status).toBe(200);
    });
});