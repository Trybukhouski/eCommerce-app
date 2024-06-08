import { Button } from '@shared';

class CartPageUI {
  public root: HTMLElement;

  readonly emptyGroup: {
    container: HTMLElement;
    elements: {
      header: HTMLHeadingElement;
      emptyMessage: HTMLElement;
      goToCatalogButton: HTMLButtonElement;
    };
  };

  constructor() {
    this.root = document.createElement('section');

    const { emptyGroupContainer, header, emptyMessage, goToCatalogButton } = this.init();
    this.emptyGroup = {
      container: emptyGroupContainer,
      elements: {
        header,
        emptyMessage,
        goToCatalogButton,
      },
    };

    this.root.append(this.emptyGroup.container);
  }

  public hideContent(): void {}

  public showEmptyMessage(): void {
    const emptyDiv = this.emptyGroup.container;
    emptyDiv.style.display = '';
  }

  public showBasket(): void {
    const emptyDiv = this.emptyGroup.container;
    emptyDiv.style.display = 'none';
  }

  private init() {
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
    emptyGroupContainer.append(header, emptyMessage, goToCatalogButton);

    return { emptyGroupContainer, header, emptyMessage, goToCatalogButton };
  }
}

export { CartPageUI };
