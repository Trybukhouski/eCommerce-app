import { clientCredentials } from '@config/config';
import { handleResponse } from '@shared';
import { LoginResponse } from '@services/interfaces';

export class AuthService {
  private static baseUrl = `${clientCredentials.authUrl}/oauth/ecommerce2024/customers`;

  public static async login(username: string, password: string): Promise<LoginResponse> {
    const url = `${this.baseUrl}/token`;
    const body = new URLSearchParams({
      grant_type: 'password',
      username,
      password,
    }).toString();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(
          `${clientCredentials.clientId}:${clientCredentials.clientSecret}`
        )}`,
      },
      body,
    });

    return handleResponse(response);
  }
}
