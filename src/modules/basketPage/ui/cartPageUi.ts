import { Cart, CartService } from '@services';
import { Button } from '@shared';
import { BusketCard } from './components';
import * as style from './style.module.scss';

class CartPageUI {
  public root: HTMLElement;

  public header: HTMLHeadingElement;

  readonly emptyGroup: {
    container: HTMLElement;
    elements: {
      emptyMessage: HTMLElement;
      goToCatalogButton: HTMLButtonElement;
    };
  };

  public productSection?: {
    container: HTMLElement;
    cards: BusketCard[];
  };

  constructor() {
    this.root = document.createElement('section');

    const { emptyGroupContainer, header, emptyMessage, goToCatalogButton } = this.init();
    this.emptyGroup = {
      container: emptyGroupContainer,
      elements: {
        emptyMessage,
        goToCatalogButton,
      },
    };
    this.header = header;

    this.root.append(this.header, this.emptyGroup.container);

    this.addClasses();

    this.showBasket();
  }

  public removeCard(card: BusketCard): void {
    const index = this.productSection?.cards.findIndex((c) => c === card);
    if (index === -1 || index === undefined || !this.productSection) {
      return;
    }
    card.card.remove();
    this.productSection.cards.splice(index, 1);

    if (this.productSection.cards.length === 0) {
      this.showEmptyMessage();
    }

    CartService.removeCardFromLocalStorage(card.data.productId);
  }

  public hideContent(): void {
    this.productSection?.container.remove();
    this.productSection = undefined;
  }

  public showEmptyMessage(): void {
    const emptyDiv = this.emptyGroup.container;
    emptyDiv.style.display = '';
  }

  public showBasket(): void {
    const emptyDiv = this.emptyGroup.container;
    emptyDiv.style.display = 'none';
  }

  private init(): {
    emptyGroupContainer: HTMLDivElement;
    header: HTMLHeadingElement;
    emptyMessage: HTMLParagraphElement;
    goToCatalogButton: HTMLButtonElement;
  } {
    const header = document.createElement('h2');
    header.textContent = 'Basket';

    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = `There's nothing here yet. Would you like to start choosing products? Click the button to go to the catalog section for it`;

    const goToCatalogButton = new Button({
      text: 'to Catalog',
      isLink: true,
      href: '#catalog',
    }).button;

    const emptyGroupContainer = document.createElement('div');
    emptyGroupContainer.append(emptyMessage, goToCatalogButton);

    return { emptyGroupContainer, header, emptyMessage, goToCatalogButton };
  }

  public createCards(cart: Cart): void {
    const items = cart.lineItems;
    const cardMap = items.map((i) => new BusketCard(i));
    this.productSection = {
      container: document.createElement('section'),
      cards: cardMap,
    };

    this.productSection.container.append(...this.productSection.cards.map((i) => i.card));
    this.root.append(this.productSection.container);
    this.productSection.container.classList.add(style['products']);
  }

  private addClasses(): void {
    this.root.classList.add(style['basket']);
    this.emptyGroup.container.classList.add(style['empty']);
  }
}

export { CartPageUI };
