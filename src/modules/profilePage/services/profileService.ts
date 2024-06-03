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

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: getJsonHeaders(),
      });

      if (!response.ok) {
        if (response.status === 404) {
          // console.log('Customer not found, returning undefined.');
          return undefined;
        }
        const errorText = await response.text();
        throw new Error(`Failed to get info about customer: ${errorText}`);
      }

      const data: Customer = await handleResponse(response);
      return data;
    } catch (error) {
      // console.error('Error fetching customer:', error);
      return undefined;
    }
  }
}

export { ProfileService };
