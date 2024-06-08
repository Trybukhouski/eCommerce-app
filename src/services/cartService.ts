import { clientCredentials } from '@root/config';
import { getHeaders, getJsonHeaders, handleResponse } from '@shared';
import { BackendService, LocalStorageService, Cart, Carts } from './shared';

class CartService extends BackendService {
  private static cartsMeEndpoint = `${clientCredentials.apiUrl}/${clientCredentials.projectKey}/me/carts`;

  public static async getCarts(): Promise<Carts | undefined> {
    const authToken = LocalStorageService.getAuthorisedToken();
    if (authToken === null) {
      return undefined;
    }

    const response = await fetch(this.cartsMeEndpoint, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Can't get carts: ${errorText}`);
    }

    const data: Carts = await handleResponse(response);

    return data;
  }

  public static async createCart(): Promise<Cart | undefined> {
    const authToken = LocalStorageService.getAuthorisedToken();
    if (authToken === null) {
      return undefined;
    }

    const response = await fetch(this.cartsMeEndpoint, {
      method: 'POST',
      headers: getJsonHeaders(),
      body: JSON.stringify({ currency: 'USD' }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Can't create cart: ${errorText}`);
    }

    const data: Cart = await handleResponse(response);

    return data;
  }
}

export { CartService };
