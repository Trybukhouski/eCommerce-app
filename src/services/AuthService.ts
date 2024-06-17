import { clientCredentials } from '@root/config';
import { handleResponse, getFormHeaders, getJsonHeaders } from '@shared';
import {
  LocalStorageService,
  BackendService,
  LoginResponse,
  RegistrationResponse,
  UserData,
  AddressAction,
  CustomerSignInResult,
  AnonymousService,
} from './shared';

export class AuthService {
  private static baseUrl = `${clientCredentials.authUrl}/oauth/ecommerce2024/customers`;

  private static registerUrl = `${clientCredentials.apiUrl}/ecommerce2024/customers`;

  private static authUrl = `${clientCredentials.apiUrl}/{projectKey}/login`;

  private static registerMeEndpoint = `${clientCredentials.apiUrl}/${clientCredentials.projectKey}/me/signup`;

  private static authMeEndpoint = `${clientCredentials.apiUrl}/${clientCredentials.projectKey}/me/login`;

  public static async login(username: string, password: string): Promise<LoginResponse> {
    const url = `${this.baseUrl}/token`;
    const anonymousToken = LocalStorageService.getAnonymousAuthorisedToken();
    if (anonymousToken) {
      return AuthService.anonymousLogin(username, password);
    }

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

    const data = await handleResponse(response);

    if (data.access_token) {
      LocalStorageService.setAuthorisedToken(data.access_token);
    }

    await AuthService.authenticateCustomer(username, password);

    return data;
  }

  public static async authenticateCustomer(
    email: string,
    password: string
  ): Promise<CustomerSignInResult> {
    const token = await BackendService.getToken();
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
      headers: getJsonHeaders(token),
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to authenticate customer: ${errorText}`);
    }

    return handleResponse(response);
  }

  public static async register(userData: UserData): Promise<RegistrationResponse> {
    const body = JSON.stringify(userData);

    const token = await BackendService.getToken();
    const url = this.registerUrl;
    const anonymousToken = LocalStorageService.getAnonymousAuthorisedToken();
    if (anonymousToken) {
      return AuthService.anonymousRegister(userData);
    }

    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: getJsonHeaders(token),
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message || 'Registration failed');
    }

    const handlingResponse: RegistrationResponse = await handleResponse(response);
    LocalStorageService.setAuthorisedToken(token);
    return handlingResponse;
  }

  public static async getCustomerVersion(userId: string): Promise<number> {
    const token = await BackendService.getToken();
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

  private static async anonymousRegister(userData: UserData): Promise<RegistrationResponse> {
    const body = JSON.stringify(userData);

    const token = LocalStorageService.getAnonymousAuthorisedToken() as string;
    const url = this.registerMeEndpoint;

    const response = await fetch(url, {
      method: 'POST',
      headers: getJsonHeaders(token),
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message || 'Registration failed');
    }

    const handlingResponse: RegistrationResponse = await handleResponse(response);
    LocalStorageService.clearAnonymousAuthorisedToken();
    await AnonymousService.getTokenFromPasswordFlow(
      userData.email as string,
      userData.password as string
    );
    return handlingResponse;
  }

  private static async anonymousLogin(email: string, password: string): Promise<LoginResponse> {
    const token = LocalStorageService.getAnonymousAuthorisedToken() as string;
    const url = this.authMeEndpoint;

    const body = JSON.stringify({
      email,
      password,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: getJsonHeaders(token),
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message || 'Authorisation failed');
    }

    await handleResponse(response);
    LocalStorageService.clearAnonymousAuthorisedToken();
    const loginResponse = await AnonymousService.getTokenFromPasswordFlow(email, password);

    return loginResponse;
  }
}
