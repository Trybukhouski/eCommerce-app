import { clientCredentials } from '@root/config';
import { LocalStorageService, Customer, AuthService, Address } from '@services';
import { getHeaders, getJsonHeaders, handleResponse } from '@shared';

interface AddressAction {
  action: string;
  [key: string]: string | boolean | null | Address;
}

class ProfileService {
  public static getCustomerIdErrorMess = `Can't find customer's id`;

  private static customersUrl = `${clientCredentials.apiUrl}/${clientCredentials.projectKey}/customers`;

  private static customerMeEndpoint = `${clientCredentials.apiUrl}/${clientCredentials.projectKey}/me`;

  private static customerID?: string;

  public static async getCustomer(): Promise<Customer | undefined> {
    const authToken = LocalStorageService.getAuthorisedToken();
    if (authToken === null) {
      return undefined;
    }

    const response = await fetch(this.customerMeEndpoint, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get info about customer: ${errorText}`);
    }

    const data: Customer = await handleResponse(response);

    this.customerID = data.id;

    return data;
  }

  public static async sendActions(actions: AddressAction[]): Promise<Customer> {
    const userId = await ProfileService.getCustomerID();
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

    const url = `${ProfileService.customersUrl}/${userId}`;
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
    const data = await handleResponse(response);
    return data;
  }

  public static async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<Customer | undefined> {
    const userId = await ProfileService.getCustomerID();
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

  public static async getCustomerID(): Promise<string> {
    if (this.customerID !== undefined) {
      return this.customerID;
    }

    const customer: Promise<Customer | undefined> = this.getCustomer();
    const id = await customer.then(() => {
      if (this.customerID === undefined) {
        throw new Error(this.getCustomerIdErrorMess);
      }
      return this.customerID;
    });

    return id;
  }

  public static deleteCustomerID(): void {
    ProfileService.customerID = undefined;
  }
}

export { ProfileService, AddressAction };
