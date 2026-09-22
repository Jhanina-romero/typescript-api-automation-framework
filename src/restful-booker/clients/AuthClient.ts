import { HttpClient } from '../../core/http/HttpClient';
import {
  AuthRequest,
  AuthResponse
} from '../models/Auth';

export class AuthClient {

  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  async createToken(
    credentials: AuthRequest
  ) {

    return this.httpClient.post<AuthResponse>(
      '/auth',
      credentials
    );
  }
}