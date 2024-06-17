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

  constructor(buttonOptions: ButtonOptions, pageUI: PageUI) {
    super(buttonOptions);
    this.pageUI = pageUI;
    this.inCart = CartService.checkCardInLocalStorage(pageUI.getProductInfo().productId);
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
          if (data?.lineItems) {
            CartService.setCurrentLineItemIDToLocalStorage(
              data.lineItems.filter(
                (el) => el.productId === this.pageUI.getProductInfo().productId
              )[0]?.id || ''
            );
          }
        });
        CartService.addCardToLocalStorage(this.pageUI.getProductInfo().productId);
      } else {
        await CartService.manageProduct({
          actions: [
            {
              action: 'remove',
              options: {
                lineItemId: CartService.getCurrentLineItemIDToLocalStorage(),
              },
            },
          ],
        });
        CartService.removeCardFromLocalStorage(this.pageUI.getProductInfo().productId);
      }
      this.inCart = CartService.checkCardInLocalStorage(this.pageUI.getProductInfo().productId);
      this.setButtonView();
      this.button.disabled = false;
    });
  }
}

export { AddToCartButton };
