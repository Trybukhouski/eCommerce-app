import { clientCredentials } from '@root/config';
import { getFormHeaders, handleResponse } from '@shared';

export class BackendService {
  private static tokenUrl = `${clientCredentials.authUrl}/oauth/token?grant_type=client_credentials`;

  private static accessToken?: string;

  static async getToken(): Promise<string | undefined> {
    if (this.accessToken) {
      return this.accessToken;
    }

    const response = await fetch(this.tokenUrl, {
      method: 'POST',
      headers: getFormHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to get token');
    }

    const data = await handleResponse(response);
    const accessToken = data.access_token;
    if (typeof accessToken === 'string') {
      this.accessToken = accessToken;
      return accessToken;
    }
    return undefined;
  }
}
