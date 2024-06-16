import { CartService, NotificationService, ManageProductOptions } from '@services';
import { Confirm } from '@shared';
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
    this.addDeleteAllListener();
  }

  private addDeleteAllListener(): void {
    this.uiApi.clearAllButton.addEventListener('click', (event) => {
      const busketCards = this.uiApi.productSection?.cards;
      if (!event.target || !busketCards || busketCards.length === 0) {
        return;
      }

      const callback = this.deleteAllCallback.bind(this, busketCards);

      const confirm = new Confirm(
        'Are you sure you want to remove all items from the shopping cart?',
        callback
      );
      document.body.append(confirm.container);
    });
  }

  private deleteAllCallback(cards: BusketCard[], isConfirmed: boolean): void {
    type ManageAction = ManageProductOptions['actions'][number];

    if (!isConfirmed) {
      return;
    }

    const ids = cards.map((c) => c.id);
    const actions = ids.map(
      (id): ManageAction => {
        return {
          action: 'remove',
          options: {
            lineItemId: id,
          },
        };
      }
    );

    const promise = CartService.manageProduct({ actions });

    promise
      .then((cart) => {
        if (!cart) {
          return;
        }

        this.uiApi.clearAllCards();
        this.uiApi.updateTotalCost(cart);
      })
      .catch((err) => {
        NotificationService.displayError(err.message);
      });
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

      const button = (event.target as HTMLElement).closest('button.delete');
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
      if (idMatch) {
        this.loadPage();
      } else {
        this.uiApi.clearAllCards();
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
      .catch((err) => {
        NotificationService.displayError(err.message);
        card.toggleDisabledButtons();
      });
  }

  private async loadPage(): Promise<void> {
    this.uiApi.hideRoot();
    const cart = await CartService.getCart();

    if (cart === undefined) {
      return;
    }

    if (cart.lineItems.length !== 0) {
      this.uiApi.hideEmptyMessage();
      this.uiApi.createCards(cart);
    }
    this.uiApi.showRoot();
  }
}

export { BasketPage };
