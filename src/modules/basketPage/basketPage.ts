import { CartService } from '@services';
import { CartPageUI } from './ui';

class BasketPage {
  public elem: HTMLElement;

  private uiApi: CartPageUI;

  constructor() {
    this.uiApi = new CartPageUI();
    this.elem = this.uiApi.root;

    this.addHashChangeListener();
  }

  private addHashChangeListener(): void {
    const func = () => {
      setTimeout(() => {}, 0);
      const idMatch = window.location.hash.match(/basket/);
      if (idMatch === null) {
        this.uiApi.hideContent();
      } else {
        this.loadPage();
      }
    };
    window.addEventListener('hashchange', func);
    document.addEventListener('DOMContentLoaded', func);
  }

  private async loadPage(): Promise<void> {
    const cart = await CartService.getCart();

    if (cart === undefined) {
      return;
    }

    if (cart.lineItems.length === 0) {
      this.uiApi.showEmptyMessage();
    } else {
      this.uiApi.showBasket();
    }
  }
}

export { BasketPage };
