import { clientCredentials } from '@root/config';
import { LocalStorageService } from '@services';

export function getHeaders() {
  return {
    Authorization: `Bearer ${LocalStorageService.getAuthorisedToken()}`,
    'Content-Type': 'application/json',
  };
}
export function getJsonHeaders() {
  const token = LocalStorageService.getAuthorisedToken();
  if (!token) {
    throw new Error('No access token found');
  }
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
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
