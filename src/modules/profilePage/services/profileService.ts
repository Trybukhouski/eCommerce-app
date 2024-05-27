import { clientCredentials } from '@root/config';
import { LocalStorageService, Customer } from '@services';
import { getJsonHeaders, handleResponse } from '@shared';

class ProfileService {
  private static customersUrl = `${clientCredentials.apiUrl}/${clientCredentials.projectKey}/customers`;

  public static async getCustomer(): Promise<Customer> {
    const id = LocalStorageService.getUserId();
    const url = `${this.customersUrl}/${id}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: getJsonHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get info about customer: ${errorText}`);
    }

    const data: Customer = await handleResponse(response);

    return data;
  }
}

export { ProfileService };
