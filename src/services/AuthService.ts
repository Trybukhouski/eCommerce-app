import { clientCredentials } from '@root/config';
import { handleResponse, getFormHeaders, getJsonHeaders } from '@shared';
import { LocalStorageService } from './localStorageService';
import {
  LoginResponse,
  RegistrationResponse,
  UserData,
  AddressAction,
  CustomerSignInResult,
} from './interfaces';

export class AuthService {
  private static baseUrl = `${clientCredentials.authUrl}/oauth/ecommerce2024/customers`;

  private static registerUrl = `${clientCredentials.apiUrl}/ecommerce2024/customers`;

  private static tokenUrl = `${clientCredentials.authUrl}/oauth/token?grant_type=client_credentials`;

  private static authUrl = `${clientCredentials.apiUrl}/{projectKey}/login`;

  public static async login(username: string, password: string): Promise<LoginResponse> {
    const url = `${this.baseUrl}/token`;
    const body = new URLSearchParams({
      grant_type: 'password',
      username,
      password,
    }).toString();

    const response = await fetch(url, {
      method: 'POST',
      headers: getFormHeaders(),
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to authenticate customer: ${errorText}`);
    }

    const authResponse = await AuthService.authenticateCustomer(username, password);
    LocalStorageService.setUserId(authResponse.customer.id);

    return handleResponse(response);
  }

  public static async authenticateCustomer(
    email: string,
    password: string
  ): Promise<CustomerSignInResult> {
    await AuthService.getToken();

    const token = LocalStorageService.getAuthorisedToken();
    if (!token) {
      throw new Error('No access token found');
    }
    const { projectKey } = clientCredentials;
    if (!projectKey) {
      throw new Error('Project key is not defined');
    }

    const url = this.authUrl.replace('{projectKey}', projectKey);
    const body = JSON.stringify({ email, password });

    const response = await fetch(url, {
      method: 'POST',
      headers: getJsonHeaders(),
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to authenticate customer: ${errorText}`);
    }

    return handleResponse(response);
  }

  public static async getToken(): Promise<void> {
    const response = await fetch(this.tokenUrl, {
      method: 'POST',
      headers: getFormHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to get token');
    }

    const data = await handleResponse(response);
    LocalStorageService.setAuthorisedToken(data.access_token);
  }

  public static async register(userData: UserData): Promise<RegistrationResponse> {
    await AuthService.getToken();
    const body = JSON.stringify(userData);

    const token = LocalStorageService.getAuthorisedToken();
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(this.registerUrl, {
      method: 'POST',
      headers: getJsonHeaders(),
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message || 'Registration failed');
    }

    const handlingResponse: RegistrationResponse = await handleResponse(response);
    LocalStorageService.setUserId(handlingResponse.customer.id);
    return handlingResponse;
  }

  public static async getCustomerVersion(userId: string): Promise<number> {
    const token = LocalStorageService.getAuthorisedToken();
    if (!token) {
      throw new Error('No access token found');
    }

    const url = `${this.registerUrl}/${userId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: getJsonHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get customer version: ${errorText}`);
    }

    const data = await handleResponse(response);
    return data.version;
  }

  public static async sendAddressAndBirthdayActions(
    userId: string,
    actions: AddressAction[]
  ): Promise<RegistrationResponse> {
    const currentVersion = await this.getCustomerVersion(userId);
    const request = {
      version: currentVersion,
      actions,
    };
    const body = JSON.stringify(request);

    const token = LocalStorageService.getAuthorisedToken();
    if (!token) {
      throw new Error('No access token found');
    }

    const url = `${this.registerUrl}/${userId}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: getJsonHeaders(),
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message || 'The addresses could not be set');
    }
    return handleResponse(response);
  }
}
