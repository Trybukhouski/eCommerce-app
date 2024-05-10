// src/config/config.ts

interface ClientCredentials {
  clientId: string;
  clientSecret: string;
  scope: string;
  apiUrl: string;
  authUrl: string;
}

const clientCredentials: ClientCredentials = {
  clientId: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  scope: process.env.REACT_APP_SCOPE,
  apiUrl: process.env.REACT_APP_API_URL,
  authUrl: process.env.REACT_APP_AUTH_URL,
};

export { clientCredentials };
