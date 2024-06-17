import { clientCredentials } from '@root/config';
import { getFormHeaders, handleResponse } from '@shared';
import { LocalStorageService } from '../localStorageService';
import { LoginResponse } from './loginResponseInterface';

export class AnonymousService {
  private static url = `${clientCredentials.authUrl}/oauth/${clientCredentials.projectKey}/anonymous/token?grant_type=client_credentials`;

  private static passwordUrl = `${clientCredentials.authUrl}/oauth/${clientCredentials.projectKey}/customers/token`;

  private static anonymousAccessToken = LocalStorageService.getAnonymousAuthorisedToken();

  static async getAnonymousToken(): Promise<string | undefined> {
    if (this.anonymousAccessToken) {
      return this.anonymousAccessToken;
    }

    const response = await fetch(this.url, {
      method: 'POST',
      headers: getFormHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to get token');
    }

    const data = await handleResponse(response);
    const accessToken = data.access_token;
    if (typeof accessToken === 'string') {
      this.anonymousAccessToken = accessToken;
      LocalStorageService.setAnonymousAuthorisedToken(accessToken);
      return accessToken;
    }
    return undefined;
  }

  static async getTokenFromPasswordFlow(
    username: string,
    password: string
  ): Promise<LoginResponse> {
    const body = new URLSearchParams({
      grant_type: 'password',
      username,
      password,
    }).toString();

    const response = await fetch(this.passwordUrl, {
      method: 'POST',
      headers: getFormHeaders(),
      body,
    });

    if (!response.ok) {
      throw new Error('Failed to get token');
    }

    const data = await handleResponse(response);
    const accessToken = data.access_token;
    if (typeof accessToken === 'string') {
      LocalStorageService.setAuthorisedToken(accessToken);
    }
    return data;
  }
}
