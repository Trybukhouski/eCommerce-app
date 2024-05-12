import dotenv from 'dotenv';

dotenv.config();

export const clientCredentials = {
  clientId: process.env['CLIENT_ID'],
  clientSecret: process.env['CLIENT_SECRET'],
  scope: process.env['SCOPE'],
  apiUrl: process.env['API_URL'],
  authUrl: process.env['AUTH_URL'],
  projectKey: process.env['PROJECT_KEY'],
};
