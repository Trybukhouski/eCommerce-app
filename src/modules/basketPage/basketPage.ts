import { CartService, NotificationService } from '@services';
import { BusketCard, CartPageUI } from './ui';

class BasketPage {
  public elem: HTMLElement;

  private uiApi: CartPageUI;

  constructor() {
    this.uiApi = new CartPageUI();
    this.elem = this.uiApi.root;

    this.addHashChangeListener();
    this.addQuantityListener();
  }

  private addQuantityListener(): void {
    this.uiApi.root.addEventListener('click', (event) => {
      if (!event.target) return;

      const button = (event.target as HTMLElement).closest('.quantity button');
      const container = (event.target as HTMLElement).closest('.quantity');
      const allCards = this.uiApi.productSection?.cards;

      if (!allCards || !button || !container) {
        return;
      }

      const card = allCards.find((c) => c.quantityModifiers.container === container);
      const quantity = card?.getQuantityAfterClick(button);
      if (!card || !quantity) return;
      card.toggleDisabledButtons();
      this.handleQuantityResponse(card, quantity);
    });
  }

  private addHashChangeListener(): void {
    const func = () => {
      const idMatch = window.location.hash.includes('basket');
      if (!idMatch) {
        this.uiApi.hideContent();
      } else {
        this.loadPage();
      }
    };
    window.addEventListener('hashchange', func);
    document.addEventListener('DOMContentLoaded', func);
  }

  private async handleQuantityResponse(card: BusketCard, quantity: number): Promise<void> {
    const promise = CartService.manageProduct({
      actions: [
        {
          action: 'changeQuantity',
          options: {
            lineItemId: card.id,
            quantity,
          },
        },
      ],
    });

    promise
      .then((cart) => {
        const lineItem = cart?.lineItems.find((i) => i.id === card.id);

        if (!cart || !lineItem) {
          return;
        }

        card.updateTotalPrice(lineItem.totalPrice.centAmount);
        card.modifyQuantity(lineItem.quantity);
      })
      .catch((err) => {
        NotificationService.displayError(err.message);
      })
      .finally(() => {
        card.toggleDisabledButtons();
      });
  }

  private async loadPage(): Promise<void> {
    const cart = await CartService.getCart();

    if (cart === undefined) {
      return;
    }

    if (cart.lineItems.length === 0) {
      this.uiApi.showEmptyMessage();
    } else {
      this.uiApi.createCards(cart);
      this.uiApi.showBasket();
    }
  }
}

export { BasketPage };
