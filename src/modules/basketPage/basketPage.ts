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
    this.addDeleteListener();
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

  private addDeleteListener(): void {
    this.uiApi.root.addEventListener('click', (event) => {
      if (!event.target) return;

      const button = (event.target as HTMLElement).closest('button');
      const allCards = this.uiApi.productSection?.cards;

      if (!allCards || !button) {
        return;
      }

      const card = allCards.find((c) => c.deleteButton === button);
      if (!card) return;
      card.toggleDisabledButtons();
      this.handleDeleteResponse(card);
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
        this.uiApi.updateTotalCost(cart);
      })
      .catch((err) => {
        NotificationService.displayError(err.message);
      })
      .finally(() => {
        card.toggleDisabledButtons();
      });
  }

  private async handleDeleteResponse(card: BusketCard): Promise<void> {
    const promise = CartService.manageProduct({
      actions: [
        {
          action: 'remove',
          options: {
            lineItemId: card.id,
          },
        },
      ],
    });

    promise
      .then((cart) => {
        if (!cart) {
          return;
        }

        this.uiApi.removeCard(card);
        this.uiApi.updateTotalCost(cart);
      })
      .then(() =>
        this.elem.dispatchEvent(new CustomEvent('changeCardsInBasket', { bubbles: true }))
      )
      .catch((err) => {
        NotificationService.displayError(err.message);
        card.toggleDisabledButtons();
      });
  }

  private async loadPage(): Promise<void> {
    this.uiApi.showBasket();
    const cart = await CartService.getCart();

    if (cart === undefined) {
      return;
    }

    if (cart.lineItems.length === 0) {
      this.uiApi.showEmptyMessage();
    } else {
      this.uiApi.createCards(cart);
    }
  }
}

export { BasketPage };
