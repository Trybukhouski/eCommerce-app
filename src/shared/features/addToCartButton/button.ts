import { Cart, CartService, NotificationService } from '@services';
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

  private id: string;

  constructor(buttonOptions: ButtonOptions, pageUI: PageUI) {
    super(buttonOptions);
    this.pageUI = pageUI;

    this.id = this.pageUI.getProductInfo().productId;
    CartService.checkIsCardInCart(this.id)
      .then((isInCart) => {
        this.inCart = isInCart;
      })
      .finally(() => this.setButtonView());

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

  private async addClickListener(): Promise<void> {
    this.button.addEventListener('click', () => {
      this.button.disabled = true;
      const info = this.pageUI.getProductInfo();

      const lineItemId = CartService.getCurrentLineItemId(info.productId);
      lineItemId
        .catch((err) => {
          if (!this.inCart) {
            return undefined;
          }
          throw err;
        })
        .then((id?: string) => {
          return this.createRequest(info, id);
        })
        .then((cart: Cart | undefined) => {
          if (!cart) {
            throw new Error(`Сouldn't add the product to the cart`);
          }
          this.inCart = !this.inCart;
          this.setButtonView();
        })
        .catch((err) =>
          NotificationService.displayError(
            err instanceof Error ? err.message : 'Error fetching customer version'
          )
        )
        .finally(() => (this.button.disabled = false));
    });
  }

  private createRequest(productInfo: ProductInfo, productId?: string): Promise<Cart | undefined> {
    if (!this.inCart) {
      return CartService.manageProduct({
        actions: [
          {
            action: 'add',
            options: productInfo,
          },
        ],
      });
    }
    return CartService.manageProduct({
      actions: [
        {
          action: 'remove',
          options: {
            lineItemId: productId ?? '',
          },
        },
      ],
    });
  }
}

export { AddToCartButton };
