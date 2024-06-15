import { CartWidgetView } from './cartWidget.view/cartWidget.view';

export class CartWidgetState extends CartWidgetView {
  private totalItemsInCart = 0;

  constructor() {
    super();
    this.render(this.totalItemsInCart);
    this.updateTotalItemsInCart();
  }

  public async updateTotalItemsInCart() {
    try {
      await this.services.cartService.getCarts().then((data) => {
        if (data) {
          if (data.results[0]) {
            this.totalItemsInCart = data.results[0].lineItems.length || 0;
            this.reRender(this.totalItemsInCart);
          }
        }
      });
    } catch (error) {
      throw new Error('Cart items is not loaded');
    }
  }
}
