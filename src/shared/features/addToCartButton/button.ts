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

  private inCart = false;

  private lineItem = '';

  constructor(buttonOptions: ButtonOptions, pageUI: PageUI) {
    super(buttonOptions);
    this.pageUI = pageUI;
    this.setButtonView();

    this.addClickListener();
  }

  private setButtonView(): void {
    if (this.inCart) {
      this.button.textContent = 'Remove from cart';
      this.button.removeAttribute('data-customColor');
    } else {
      this.button.textContent = 'Add to cart';
      this.button.setAttribute('data-customColor', 'blue');
    }
  }

  private addClickListener(): void {
    this.button.addEventListener('click', async () => {
      this.button.disabled = true;
      const info = this.pageUI.getProductInfo();
      if (!this.inCart) {
        await CartService.manageProduct({
          actions: [
            {
              action: 'add',
              options: info,
            },
          ],
        }).then((data) => {
          if (data) {
            if (data.lineItems[0]) {
              this.lineItem = data.lineItems[0].id;
            }
          }
        });
      } else {
        await CartService.manageProduct({
          actions: [
            {
              action: 'remove',
              options: {
                lineItemId: this.lineItem,
              },
            },
          ],
        });
      }

      this.inCart = !this.inCart;
      this.setButtonView();
      this.button.disabled = false;
    });
  }
}

export { AddToCartButton };
