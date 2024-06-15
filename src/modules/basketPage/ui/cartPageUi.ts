import { Cart } from '@services';
import { Button } from '@shared';
import trashCanIcon from '@assets/sprites/trash/trash-basket-svgrepo-com.svg';
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

  public productsGroupContainer: HTMLElement;

  public productSection?: {
    container: HTMLElement;
    cards: BusketCard[];
  };

  public totalCartCost: {
    container: HTMLElement;
    text: HTMLElement;
    cost: HTMLElement;
    value: number;
  };

  public clearAllButton: HTMLButtonElement;

  constructor() {
    this.root = document.createElement('section');

    const { emptyGroupContainer, header, emptyMessage, goToCatalogButton } = this.init();
    this.productsGroupContainer = document.createElement('section');
    this.emptyGroup = {
      container: emptyGroupContainer,
      elements: {
        emptyMessage,
        goToCatalogButton,
      },
    };
    this.header = header;
    this.totalCartCost = this.addTotalCartCost();

    this.clearAllButton = new Button({
      text: 'Clear All',
      icon: {
        sprite: trashCanIcon,
        towhere: 'end',
      },
      className: 'edit-icon',
    }).button;

    this.root.append(this.header, this.emptyGroup.container, this.productsGroupContainer);
    this.productsGroupContainer.append(this.clearAllButton);

    this.addClasses();

    this.hideEmptyMessage();
  }

  public hideRoot(): void {
    this.root.style.display = 'none';
  }

  public showRoot(): void {
    this.root.style.display = '';
  }

  public clearAllCards(): void {
    this.productSection?.cards.forEach((card) => {
      card.card.remove();
    });

    this.productSection = undefined;
    this.showEmptyMessage();
  }

  public createCards(cart: Cart): void {
    const items = cart.lineItems;
    const cardMap = items.map((i) => new BusketCard(i));

    this.productSection = {
      container: document.createElement('section'),
      cards: cardMap,
    };

    this.productSection.container.append(...this.productSection.cards.map((i) => i.card));
    this.productSection.container.classList.add(style['products']);

    this.updateTotalCost(cart);
    this.productsGroupContainer.append(this.productSection.container, this.totalCartCost.container);
  }

  public updateTotalCost(cart: Cart): void {
    const totalValue = cart.totalPrice.centAmount;
    this.totalCartCost.value = totalValue;
    this.totalCartCost.cost.textContent = CartPageUI.formatPrice(totalValue);
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
  }

  public showEmptyMessage(): void {
    const emptyDiv = this.emptyGroup.container;
    emptyDiv.style.display = '';
  }

  public hideEmptyMessage(): void {
    const emptyDiv = this.emptyGroup.container;
    emptyDiv.style.display = 'none';
  }

  private static formatPrice(n: number): string {
    return BusketCard.formatPrice(n);
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

  private addTotalCartCost(): typeof this.totalCartCost {
    const totalCartCost: typeof this.totalCartCost = {
      container: document.createElement('div'),
      text: document.createElement('span'),
      cost: document.createElement('span'),
      value: 0,
    };
    totalCartCost.text.textContent = 'Total Cost: ';
    totalCartCost.container.append(totalCartCost.text, totalCartCost.cost);
    return totalCartCost;
  }

  private addClasses(): void {
    ([
      [this.root, style['basket']],
      [this.emptyGroup.container, style['empty']],
      [this.totalCartCost.container, 'total-cart-cost'],
      [this.clearAllButton, 'clear-all'],
      [this.productsGroupContainer, 'products-group'],
    ] as const).forEach(([element, className]) => {
      element.classList.add(className);
    });
  }
}

export { CartPageUI };
