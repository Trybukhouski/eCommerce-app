import { ErrorObject } from '@shared/utils/interfaces';

type ErrorMessageMap = { [key: string]: string };

const defaultMessages: ErrorMessageMap = {
  400: 'Bad Request',
  401: 'Unauthorized: Please login to continue.',
  403: 'Forbidden: You do not have permission to access this resource.',
  404: 'Not Found: The requested resource was not found.',
  500: 'Internal Server Error: Please try again later.',
};

const customErrorMessages: ErrorMessageMap = {
  InvalidCredentials: 'Invalid login or password. Please check your credentials and try again.',
  UserNotFound: 'No user found with the provided credentials.',
};

export async function handleResponse(response: Response) {
  let responseData;
  try {
    responseData = await response.json();
  } catch (error) {
    responseData = { message: await response.text() };
  }

  if (!response.ok) {
    const errorMessage =
      responseData.errors
        ?.map((err: ErrorObject) => {
          return customErrorMessages[err.code] || err.message;
        })
        .join(', ') ||
      `${
        defaultMessages[response.status as keyof typeof defaultMessages] ||
        `Unexpected Error - Status ${response.status}`
      }: ${responseData.message || 'An unknown error occurred.'}`;

    console.error('Server error:', errorMessage);
    throw new Error(errorMessage);
  }
  return responseData;
}
