import { Customer, NotificationService } from '@services';

async function handleResponse(
  callback: Promise<Customer> | void,
  successMess?: string,
  errorMess?: string
): Promise<Customer | undefined> {
  if (!(callback instanceof Promise)) {
    return undefined;
  }
  return callback
    .then((result) => {
      if (successMess) {
        NotificationService.displaySuccess(successMess);
      }
      return result;
    })
    .catch((err) => {
      const message = errorMess ?? 'Something went wrong';
      NotificationService.displayError(err instanceof Error ? err.message : message);
      return undefined;
    });
}

export { handleResponse };
