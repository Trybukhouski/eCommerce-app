import { ErrorObject } from '@shared/utils/interfaces';

export async function handleResponse(response: Response) {
  let responseData;
  try {
    responseData = await response.json();
  } catch (error) {
    responseData = { message: await response.text() };
  }
  if (!response.ok) {
    let errorMessage = responseData.message || 'Unknown error occurred';
    if (responseData.errors && responseData.errors.length > 0) {
      errorMessage = responseData.errors
        .map((err: ErrorObject) => `${err.code}: ${err.message}`)
        .join(', ');
    } else {
      switch (response.status) {
        case 400:
          errorMessage = `Bad Request: ${errorMessage}`;
          break;
        case 401:
          errorMessage = `Unauthorized: ${errorMessage}`;
          break;
        case 403:
          errorMessage = `Forbidden: ${errorMessage}`;
          break;
        case 404:
          errorMessage = `Not Found: ${errorMessage}`;
          break;
        case 500:
          errorMessage = `Internal Server Error: ${errorMessage}`;
          break;
        default:
          errorMessage = `Unexpected Error - Status ${response.status}: ${errorMessage}`;
          break;
      }
    }
    console.error('Server error:', errorMessage);
    throw new Error(errorMessage);
  }
  return responseData;
}
