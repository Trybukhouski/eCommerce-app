import { clientCredentials } from '@root/config';
import { LocalStorageService } from '@services';

export function getHeaders(token?: string) {
  let bearerToken = token ?? LocalStorageService.getAuthorisedToken();
  bearerToken = bearerToken ?? LocalStorageService.getAnonymousAuthorisedToken();
  if (!bearerToken) {
    throw new Error('No access token found');
  }
  return {
    Authorization: `Bearer ${bearerToken}`,
  };
}
export function getJsonHeaders(token?: string) {
  let bearerToken = token ?? LocalStorageService.getAuthorisedToken();
  bearerToken = bearerToken ?? LocalStorageService.getAnonymousAuthorisedToken();
  if (!bearerToken) {
    throw new Error('No access token found');
  }
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${bearerToken}`,
  };
}

export function getFormHeaders() {
  return {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${btoa(
      `${clientCredentials.clientId}:${clientCredentials.clientSecret}`
    )}`,
  };
}
