import { AuthClient } from '../../../src/restful-booker/clients/AuthClient';

describe('POST /auth', () => {

  test('should generate authentication token', async () => {

    const authClient = new AuthClient();

    const response = await authClient.createToken({
      username: 'admin',
      password: 'password123'
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('token');

    expect(response.data.token).toBeTruthy();
  });

});