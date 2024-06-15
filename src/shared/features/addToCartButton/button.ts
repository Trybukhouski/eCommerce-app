import { CartService } from '@services';
import { Button, ButtonOptions } from '@shared';

interface ProductInfo {
  productId: string;
  variantId: number;
}

interface PageUI {
  getProductInfo: () => ProductInfo;
}

class AddToCartButton extends Button {
  private pageUI: PageUI;

  constructor(buttonOptions: ButtonOptions, pageUI: PageUI) {
    super(buttonOptions);
    this.pageUI = pageUI;

    this.addClickListener();
  }

  private addClickListener(): void {
    this.button.addEventListener('click', async () => {
      const info = this.pageUI.getProductInfo();
      await CartService.manageProduct({
        actions: [
          {
            action: 'add',
            options: info,
          },
        ],
      });
      this.button.dispatchEvent(new CustomEvent('changeCardsInBasket', { bubbles: true }));
    });
  }
}

export { AddToCartButton };
