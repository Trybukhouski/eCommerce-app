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

interface ChangeProductQuantityAction extends RemoveProductFromCartAction {
  quantity: number;
}

interface AddProductToCartOptions {
  productId: string;
  variantId: number;
}

interface RemoveProductFromCartOptions {
  lineItemId: string;
}

interface ChangeProductQuantityOptions extends RemoveProductFromCartOptions {
  quantity: number;
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
    | {
        action: 'changeQuantity';
        options: ChangeProductQuantityOptions;
      }
  )[];
}

export {
  Action,
  AddProductToCartAction,
  RemoveProductFromCartAction,
  ChangeProductQuantityAction,
  AddProductToCartOptions,
  RemoveProductFromCartOptions,
  ChangeProductQuantityOptions,
  SentCartActionOptions,
  ManageProductOptions,
};
