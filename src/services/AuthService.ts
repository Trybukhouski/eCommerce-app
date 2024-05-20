import { clientCredentials } from '@root/config';
import { handleResponse } from '@shared';
import { LoginResponse, RegistrationResponse, UserData, AddressAction } from './interfaces';

export class AuthService {
  private static baseUrl = `${clientCredentials.authUrl}/oauth/ecommerce2024/customers`;

  private static registerUrl = `${clientCredentials.apiUrl}/ecommerce2024/customers`;

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
      throw new Error('Failed to get token');
    }

    const data = await handleResponse(response);
    localStorage.setItem('accessToken', data.access_token);
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

  public static async getCustomerVersion(userId: string): Promise<number> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    const url = `${this.registerUrl}/${userId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get customer version: ${errorText}`);
    }

    const data = await handleResponse(response);
    return data.version;
  }

  public static async sendAddressActions(
    userId: string,
    actions: AddressAction[]
  ): Promise<RegistrationResponse> {
    const currentVersion = await this.getCustomerVersion(userId);
    const request = {
      version: currentVersion,
      actions,
    };
    const body = JSON.stringify(request);

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No access token found');
    }

    const url = `${this.registerUrl}/${userId}`;
    const response = await fetch(url, {
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
      throw new Error(errorJson.message || 'The addresses could not be set');
    }
    return handleResponse(response);
  }

  public static isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  public static logout(): void {
    localStorage.removeItem('accessToken');
    router.setHash('login');
  }
}
