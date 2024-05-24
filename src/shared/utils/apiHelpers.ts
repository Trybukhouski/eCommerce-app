import { clientCredentials } from '@root/config';

export const getHeaders = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'application/json',
  };
};
export const getJsonHeaders = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('No access token found');
  }
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const getFormHeaders = () => {
  return {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${btoa(
      `${clientCredentials.clientId}:${clientCredentials.clientSecret}`
    )}`,
  };
};
