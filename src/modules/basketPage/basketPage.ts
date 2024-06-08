import { CartService } from './services';

class BasketPage {
  public elem: HTMLElement;

  constructor() {
    this.elem = document.createElement('div');

    this.addHashChangeListener();
  }

  private addHashChangeListener(): void {
    const func = () => {
      setTimeout(() => {}, 0);
      const idMatch = window.location.hash.match(/basket/);
      if (idMatch === null) {
        return;
      }
      this.loadPage();
    };
    window.addEventListener('hashchange', func);
    document.addEventListener('DOMContentLoaded', func);
  }

  private loadPage(): Promise<unknown> {
    const response: Promise<unknown> = CartService.checkIsCartExist();
    return response;
  }
}

export { BasketPage };
