import { clientCredentials } from '@config/config';
import { handleResponse } from '@shared';
import { LoginResponse, RegistrationResponse } from '@services/interfaces';

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
      const errorText = await response.text();
      console.error('Token error:', errorText);
      throw new Error('Failed to get token');
    }

    const data = await handleResponse(response);
    localStorage.setItem('accessToken', data.access_token);
    console.log('Token obtained and saved:', data.access_token);
  }

  public static async register(userData: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    birthDate: string;
    country: string;
    city: string;
    street: string;
    postalCode: string;
  }): Promise<RegistrationResponse> {
    const body = JSON.stringify({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: userData.password,
      addresses: [
        {
          country: userData.country,
          city: userData.city,
          streetName: userData.street,
          postalCode: userData.postalCode,
          additionalAddressInfo: `Date of Birth: ${userData.birthDate}`,
        },
      ],
    });

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    console.log('Using token for registration:', token);

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
      console.error('Registration error:', errorText);
      throw new Error('Registration failed');
    }

    return handleResponse(response);
  }
}
