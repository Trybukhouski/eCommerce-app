import { CartWidgetView } from './cartWidget.view/cartWidget.view';

export class CartWidgetState extends CartWidgetView {
  private totalItemsInCart = 0;

  constructor() {
    super();
    this.render(this.totalItemsInCart);
    this.updateTotalItemsInCart();
  }

  public async updateTotalItemsInCart(n?: number) {
    if (n) {
      this.reRender(n);
      return;
    }

    try {
      await this.services.cartService.getCart().then((cart) => {
        if (cart) {
          this.totalItemsInCart = cart.lineItems.length || 0;
          this.reRender(this.totalItemsInCart);
        }
      });
    } catch (error) {
      throw new Error('Cart items is not loaded');
    }
  }
}
