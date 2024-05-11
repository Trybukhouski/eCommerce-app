// AuthService.ts
import { handleResponse } from '@shared/utils/errorHandling';
import { clientCredentials } from '../../../config';

export class AuthService {
  static async login(email: string, password: string): Promise<void> {
    const url = `${clientCredentials.authUrl}/oauth/ecommerce2024/customers/token`;
    const body = new URLSearchParams({
      grant_type: 'password',
      username: email,
      password,
    }).toString();

    try {
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
      const data = await handleResponse(response);
      console.log('Authentication successful:', data);
      alert('Logged in successfully!');
      window.location.href = '/main.html';
    } catch (error) {
      if (error instanceof Error) {
        console.error('Authentication error:', error.message);
        alert(error.message);
      } else {
        console.error('Unexpected error', error);
      }
    }
  }
}
