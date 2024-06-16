import { clientCredentials } from '@root/config';
import { getFormHeaders, handleResponse } from '@shared';
import { LocalStorageService } from './shared';

export class AnonymousService {
  private static url = `${clientCredentials.authUrl}/oauth/${clientCredentials.projectKey}/anonymous/token?grant_type=client_credentials`;

  private static anonymousAccessToken = LocalStorageService.getAnonymousAuthorisedToken();

  static async createAnonymousToken() {
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
}
