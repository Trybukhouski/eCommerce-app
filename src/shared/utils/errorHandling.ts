import { ErrorObject } from './interfaces';

type ErrorMessageMap = { [key: string]: string };

const defaultMessages: ErrorMessageMap = {
  400: 'Bad Request',
  401: 'Unauthorized: Please login to continue.',
  403: 'Forbidden: You do not have permission to access this resource.',
  404: 'Not Found: The requested resource was not found.',
  500: 'Internal Server Error: Please try again later.',
};

const customErrorMessages: ErrorMessageMap = {
  invalid_customer_account_credentials: 'Customer account with the given credentials not found.',
  InvalidCredentials: 'Invalid login or password. Please check your credentials and try again.',
  UserNotFound: 'No user found with the provided credentials.',
};
export async function handleResponse(response: Response) {
  const contentType = response.headers.get('Content-Type');

  if (!response.ok) {
    let errorMessage = 'An unknown error occurred.';
    if (contentType && contentType.includes('application/json')) {
      const responseData = await response.json();
      if (responseData.errors && responseData.errors.length > 0) {
        errorMessage = responseData.errors
          .map((err: ErrorObject) => {
            return customErrorMessages[err.code] || err.message;
          })
          .join(', ');
      } else {
        errorMessage =
          defaultMessages[response.status as keyof typeof defaultMessages] ||
          `Unexpected Error - Status ${response.status}: ${responseData.message || errorMessage}`;
      }
    } else {
      errorMessage = await response.text();
    }
    // console.error('Server error:', errorMessage);
    throw new Error(errorMessage);
  }

  return response.json();
}
