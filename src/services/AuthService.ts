import { clientCredentials } from '@config/config';
import { handleResponse } from '@shared';
import { LoginResponse, RegistrationResponse, UserData } from './interfaces';

export class AuthService {
  // URL for authentication
  private static baseUrl = `${clientCredentials.authUrl}/oauth/ecommerce2024/customers`;

  // URL for registration
  private static registerUrl = `${clientCredentials.apiUrl}/ecommerce2024/customers`;

  // URL for client credentials token
  private static tokenUrl = `${clientCredentials.authUrl}/oauth/token?grant_type=client_credentials`;

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

  public static async getToken(): Promise<void> {
    const response = await fetch(this.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${btoa(
          `${clientCredentials.clientId}:${clientCredentials.clientSecret}`
        )}`,
      },
    });

    if (!response.ok) {
      // const errorText = await response.text();
      // console.error('Token error:', errorText);
      throw new Error('Failed to get token');
    }

    const data = await handleResponse(response);
    localStorage.setItem('accessToken', data.access_token);
    // console.log('Token obtained and saved:', data.access_token);
  }

  public static async register(userData: UserData): Promise<RegistrationResponse> {
    const body = JSON.stringify(userData);

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(this.registerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message || 'Registration failed');
    }
    return handleResponse(response);
  }

  public static async sendAction() {}
}
