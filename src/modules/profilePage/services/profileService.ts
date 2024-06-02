import { clientCredentials } from '@root/config';
import { LocalStorageService, Customer } from '@services';
import { getJsonHeaders, handleResponse } from '@shared';

class ProfileService {
  private static customersUrl = `${clientCredentials.apiUrl}/${clientCredentials.projectKey}/customers`;

  public static async getCustomer(): Promise<Customer | undefined> {
    const id = LocalStorageService.getUserId();
    const url = `${this.customersUrl}/${id}`;

    const token = LocalStorageService.getAuthorisedToken();
    if (!token) {
      return undefined;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: getJsonHeaders(),
    });

    if (!response.ok) {
      // Добавлено условие для обработки ситуации, когда ресурс не найден (404 статус)
      if (response.status === 404) {
        console.warn(`Customer with ID '${id}' was not found.`);
        return undefined;
      }
      const errorText = await response.text();
      throw new Error(`Failed to get info about customer: ${errorText}`);
    }

    const data: Customer = await handleResponse(response);

    return data;
  }
}

export { ProfileService };
