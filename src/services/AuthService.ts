import { clientCredentials } from '@config/config';
import { handleResponse } from '@shared';
import { LoginResponse, RegistrationResponse } from '@services/interfaces';

export class AuthService {
  // Base URL for the API
  private static baseUrl = `https://api.${clientCredentials.apiUrl}.commercetools.com/${clientCredentials.projectKey}`;

  public static async login(username: string, password: string): Promise<LoginResponse> {
    const url = `${this.baseUrl}/oauth/ecommerce2024/customers/token`;
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
    const url = `${this.baseUrl}/customers`;
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

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body,
    });

    return handleResponse(response);
  }
}
