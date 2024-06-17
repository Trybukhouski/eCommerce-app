import { clientCredentials } from '@root/config';
import { getFormHeaders, handleResponse } from '@shared';
import { LocalStorageService } from './shared';

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
  ): Promise<string | undefined> {
    const queryString = `?grant_type=password&username=${username}&password=${password}`;

    const response = await fetch(this.passwordUrl.concat(queryString), {
      method: 'POST',
      headers: getFormHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to get token');
    }

    const data = await handleResponse(response);
    const accessToken = data.access_token;
    if (typeof accessToken === 'string') {
      LocalStorageService.setAuthorisedToken(accessToken);
      return accessToken;
    }
    return undefined;
  }
}
