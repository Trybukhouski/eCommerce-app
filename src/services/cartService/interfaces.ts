interface Action {
  action: string;
}

interface AddProductToCartAction extends Action {
  productId: string;
  variantId: number;
  quantity: number;
}

interface RemoveProductFromCartAction extends Action {
  lineItemId: string;
}

interface AddProductToCartOptions {
  productId: string;
  variantId: number;
}

interface RemoveProductFromCartOptions {
  lineItemId: string;
}

interface SentCartActionOptions {
  actionsArr: Action[];
  cartVersion: number;
  cartId: string;
}

interface ManageProductOptions {
  actions: (
    | {
        action: 'remove';
        options: RemoveProductFromCartOptions;
      }
    | {
        action: 'add';
        options: AddProductToCartOptions;
      }
  )[];
}

export {
  Action,
  AddProductToCartAction,
  RemoveProductFromCartAction,
  AddProductToCartOptions,
  RemoveProductFromCartOptions,
  SentCartActionOptions,
  ManageProductOptions,
};
