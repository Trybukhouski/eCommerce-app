import { clientCredentials } from '@root/config';
import { getHeaders, getJsonHeaders, handleResponse } from '@shared';
import { BackendService, LocalStorageService, Cart, Carts } from '../shared';
import {
  AddProductToCartAction,
  RemoveProductFromCartAction,
  AddProductToCartOptions,
  RemoveProductFromCartOptions,
  SentCartActionOptions,
  ManageProductOptions,
  Action,
} from './interfaces';

class CartService extends BackendService {
  private static cartsMeEndpoint = `${clientCredentials.apiUrl}/${clientCredentials.projectKey}/me/carts`;

  public static async getCart(): Promise<Cart | undefined> {
    const authToken = LocalStorageService.getAuthorisedToken();
    if (authToken === null) {
      return undefined;
    }

    let cart: Cart | undefined;
    const carts = await CartService.getCarts();
    if (carts === undefined) {
      return undefined;
    }

    if (carts.count === 0) {
      cart = await CartService.createCart();
    } else {
      cart = carts.results[0];
    }
    return cart;
  }

  public static async manageProduct(options: ManageProductOptions): Promise<Cart | undefined> {
    const cart = await CartService.getCart();

    if (!cart) return undefined;

    const actionsArr = options.actions
      .map((i) => {
        switch (i.action) {
          case 'add':
            return CartService.addLineItemToCart(i.options);
          case 'remove':
            return CartService.removeLineItemFromCart(i.options);
          default:
            return undefined;
        }
      })
      .filter((i) => i !== undefined) as Action[];

    const newOptions: SentCartActionOptions = {
      actionsArr,
      cartVersion: cart.version,
      cartId: cart.id,
    };

    return CartService.sentCartActions(newOptions);
  }

  private static async getCarts(): Promise<Carts | undefined> {
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

  private static async createCart(): Promise<Cart | undefined> {
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

  private static async sentCartActions(options: SentCartActionOptions): Promise<Cart | undefined> {
    const authToken = LocalStorageService.getAuthorisedToken();
    if (authToken === null) {
      return undefined;
    }

    const { actionsArr, cartVersion, cartId } = options;

    const body = JSON.stringify({
      version: cartVersion,
      actions: actionsArr,
    });

    const url = this.cartsMeEndpoint.concat('/', cartId);
    const response = await fetch(url, {
      method: 'POST',
      headers: getJsonHeaders(),
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Can't create cart: ${errorText}`);
    }

    const data: Cart = await handleResponse(response);

    return data;
  }

  private static addLineItemToCart(options: AddProductToCartOptions): AddProductToCartAction {
    const { productId, variantId } = options;

    const action: AddProductToCartAction = {
      action: 'addLineItem',
      productId,
      variantId,
      quantity: 1,
    };

    return action;
  }

  private static removeLineItemFromCart(
    options: RemoveProductFromCartOptions
  ): RemoveProductFromCartAction {
    const { lineItemId } = options;

    const action: RemoveProductFromCartAction = {
      action: 'removeLineItem',
      lineItemId,
    };

    return action;
  }
}

export { CartService };
