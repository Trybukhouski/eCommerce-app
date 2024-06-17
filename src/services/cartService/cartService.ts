import { clientCredentials } from '@root/config';
import { getHeaders, getJsonHeaders, handleResponse } from '@shared';
import { BackendService, LocalStorageService, Cart, Carts } from '../shared';
import {
  AddProductToCartAction,
  RemoveProductFromCartAction,
  ChangeProductQuantityAction,
  AddProductToCartOptions,
  RemoveProductFromCartOptions,
  ChangeProductQuantityOptions,
  SentCartActionOptions,
  ManageProductOptions,
  Action,
} from './interfaces';
import { AnonymousService } from '../shared/services/anonymousService/AnonymousService';

class CartService extends BackendService {
  private static cartsMeEndpoint = `${clientCredentials.apiUrl}/${clientCredentials.projectKey}/me/carts`;

  private static recentCart?: Cart;

  public static async getCart(): Promise<Cart | undefined> {
    const authToken = LocalStorageService.getAuthorisedToken();
    const authAnonimToken = await AnonymousService.getAnonymousToken();
    if (authToken === null && authAnonimToken === undefined) {
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
    CartService.recentCart = cart;
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
          case 'changeQuantity':
            return CartService.changeLineItemQuantity(i.options);
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

    const data = await CartService.sentCartActions(newOptions);

    if (data) {
      document.dispatchEvent(
        new CustomEvent('changeCardsInBasket', {
          bubbles: true,
          detail: data.lineItems.length,
        })
      );
    }

    return data;
  }

  public static async getRecentCart(): Promise<Cart> {
    let { recentCart } = CartService;
    if (recentCart) {
      return recentCart;
    }

    recentCart = await CartService.getCart();
    if (!recentCart) {
      throw new Error(`Can't get cart`);
    }

    return recentCart;
  }

  public static async checkIsCardInCart(id: string): Promise<boolean> {
    const recentCart = await CartService.getRecentCart();

    const ids = recentCart.lineItems.map((i) => i.productId);
    return ids.includes(id);
  }

  public static async getCurrentLineItemId(id: string): Promise<string> {
    const recentCart = await CartService.getRecentCart();

    const lineItem = recentCart.lineItems.find((i) => i.productId === id);

    if (!lineItem) {
      throw new Error(`Can't find item in cart`);
    }
    return lineItem.id;
  }

  private static async getCarts(): Promise<Carts | undefined> {
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
    CartService.recentCart = data;

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

  private static changeLineItemQuantity(
    options: ChangeProductQuantityOptions
  ): ChangeProductQuantityAction {
    const { lineItemId, quantity } = options;

    const action: ChangeProductQuantityAction = {
      action: 'changeLineItemQuantity',
      lineItemId,
      quantity,
    };

    return action;
  }
}

export { CartService };
