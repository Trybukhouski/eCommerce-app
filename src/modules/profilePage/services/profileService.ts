import { clientCredentials } from '@root/config';
import { LocalStorageService, Customer, RegistrationResponse, AuthService } from '@services';
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
      const errorText = await response.text();
      throw new Error(`Failed to get info about customer: ${errorText}`);
    }

    const data: Customer = await handleResponse(response);

    return data;
  }

  public static async sendActions(
    actions: {
      [key: string]: string | boolean;
      action: string;
    }[]
  ): Promise<RegistrationResponse> {
    const userId = LocalStorageService.getUserId();
    if (userId === null) {
      throw new Error(`Can't find customer's id`);
    }
    const currentVersion = await AuthService.getCustomerVersion(userId);
    const request = {
      version: currentVersion,
      actions,
    };
    const body = JSON.stringify(request);

    const token = LocalStorageService.getAuthorisedToken();
    if (!token) {
      throw new Error('No access token found');
    }

    const url = `${this.customersUrl}/${userId}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: getJsonHeaders(),
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message || 'The addresses could not be set');
    }
    return handleResponse(response);
  }

  public static async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<Customer | undefined> {
    const userId = LocalStorageService.getUserId();
    const url = `${ProfileService.customersUrl}/password`;

    const token = LocalStorageService.getAuthorisedToken();
    if (!token || !userId) {
      return undefined;
    }

    const currentVersion = await AuthService.getCustomerVersion(userId);
    const request = {
      id: userId,
      version: currentVersion,
      currentPassword,
      newPassword,
    };
    const body = JSON.stringify(request);

    const response = await fetch(url, {
      method: 'POST',
      headers: getJsonHeaders(),
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get info about customer: ${errorText}`);
    }

    const data: Customer = await handleResponse(response);

    AuthService.login(data.email, newPassword);

    return data;
  }
}

export { ProfileService };
