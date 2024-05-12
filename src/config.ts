import dotenv from 'dotenv';
dotenv.config();

export const clientCredentials = {
  clientId: process.env['CLIENT_ID'], // Используйте скобочную нотацию
  clientSecret: process.env['CLIENT_SECRET'], // Используйте скобочную нотацию
  scope: process.env['SCOPE'], // Используйте скобочную нотацию
  apiUrl: process.env['API_URL'], // Используйте скобочную нотацию
  authUrl: process.env['AUTH_URL'], // Используйте скобочную нотацию
  projectKey: process.env['PROJECT_KEY'], // Используйте скобочную нотацию
};
