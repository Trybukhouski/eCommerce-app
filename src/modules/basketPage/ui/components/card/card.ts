import { LineItem } from '@services';
import { Button } from '@shared';
import * as style from './card.module.scss';

interface PriceElements {
  price: {
    elem: HTMLElement;
    value: number;
  };
  discounted?: {
    elem: HTMLElement;
    value: number;
  };
}

class BusketCard {
  public id: string;

  public card: HTMLElement;

  public name: HTMLHeadingElement;

  public img: {
    container: HTMLElement;
    image: HTMLImageElement;
  };

  public attributes: {
    container: HTMLElement;
    elements: HTMLElement[];
  };

  public prices: {
    container: HTMLElement;
    elements: PriceElements;
  };

  public quantityModifiers: {
    container: HTMLElement;
    elements: {
      increase: HTMLButtonElement;
      reduce: HTMLButtonElement;
      count: HTMLElement;
    };
    quantity: number;
  };

  public totalPrice: {
    container: HTMLElement;
    elements: {
      span: HTMLElement;
      price: HTMLElement;
    };
    value: number;
  };

  public deleteButton: HTMLButtonElement;

  constructor(lineItem: LineItem) {
    this.id = lineItem.id;
    this.id = lineItem.id;
    this.card = document.createElement('section');

    this.name = document.createElement('h3');
    this.name.textContent = lineItem.name['en-GB'];
    this.img = {
      container: document.createElement('div'),
      image: document.createElement('img'),
    };
    this.img.image.src = lineItem.variant.images[0]?.url ?? '';
    this.img.container.append(this.img.image);

    this.attributes = {
      container: document.createElement('div'),
      elements: this.createAttributes(lineItem),
    };
    this.attributes.container.append(...this.attributes.elements);

    this.prices = this.addPrices(lineItem);
    this.totalPrice = this.addTotalPrice(lineItem);

    this.quantityModifiers = this.addQuantityModifiers(lineItem);

    this.deleteButton = new Button({
      className: 'edit-icon',
    }).button;

    this.appendElements();

    this.addClasses();

    this.toggleDisabledButtons();
    this.toggleDisabledButtons();
  }

  public toggleDisabledButtons(): void {
    const { elements } = this.quantityModifiers;
    const isQuantityEqualOne = this.quantityModifiers.quantity === 1;
    const isDisabled = elements.increase.disabled;
    this.deleteButton.disabled = !isDisabled;
    elements.increase.disabled = !isDisabled;
    elements.reduce.disabled = isQuantityEqualOne ? true : !isDisabled;
  }

  public getQuantityAfterClick(targetButton: Element): number | undefined {
    const elems = this.quantityModifiers.elements;
    const { quantity } = this.quantityModifiers;
    if (targetButton === elems.increase) {
      return quantity + 1;
    }
    if (targetButton === elems.reduce) {
      return quantity - 1;
    }
    return undefined;
  }

  public modifyQuantity(quantity: number): void {
    this.quantityModifiers.quantity = quantity;
    this.quantityModifiers.elements.count.textContent = `${quantity}`;
  }

  public updateTotalPrice(centAmount: number): void {
    const newPrice = BusketCard.formatPrice(centAmount);
    this.totalPrice.elements.price.textContent = newPrice;
    this.totalPrice.value = centAmount;
  }

  public static formatPrice(n: number): string {
    return `${Math.trunc(n / 100)}${(n % 1).toPrecision(3).replace(/0/, '')}`;
  }

  private appendElements(): void {
    this.card.append(
      this.name,
      this.img.container,
      this.attributes.container,
      this.prices.container,
      this.quantityModifiers.container,
      this.totalPrice.container,
      this.deleteButton
    );
  }

  private createAttributes(lineItem: LineItem): HTMLDivElement[] {
    const attribs = lineItem.variant.attributes.filter(
      (i) => i.name === 'brand' || i.name === 'material'
    );
    return attribs.map((i) => {
      const div = document.createElement('div');
      const name = document.createElement('h4');
      const value = document.createElement('p');
      name.textContent = i.name;
      value.textContent = i.value;
      div.append(name, value);
      return div;
    });
  }

  private addPrices(lineItem: LineItem): typeof this.prices {
    const container = document.createElement('div');
    const prices: [number, number?] = [
      lineItem.price.value.centAmount,
      lineItem.price.discounted?.value.centAmount,
    ];
    const pricesElems = prices.map(
      (p): HTMLElement => {
        const priceElem = document.createElement('p');
        priceElem.textContent = BusketCard.formatPrice(p ?? prices[0]);
        return priceElem;
      }
    ) as [HTMLElement, HTMLElement];

    const obj: typeof this.prices = {
      container,
      elements: {
        price: {
          elem: pricesElems[0],
          value: prices[0],
        },
      },
    };
    container.append(pricesElems[0]);

    if (prices[0] === prices[1] || prices[1] === undefined) {
      return obj;
    }

    obj.elements.discounted = {
      elem: pricesElems[1],
      value: prices[1],
    };
    container.append(pricesElems[1]);

    return obj;
  }

  private addTotalPrice(lineItem: LineItem): typeof this.totalPrice {
    const value = lineItem.totalPrice.centAmount;
    const priceText = BusketCard.formatPrice(value);
    const price = document.createElement('span');
    price.textContent = priceText;
    const span = document.createElement('span');
    span.textContent = 'Total Price:';

    const container = document.createElement('div');
    container.append(span, price);

    return {
      container,
      elements: {
        span,
        price,
      },
      value,
    };
  }

  private addQuantityModifiers(lineItem: LineItem): typeof this.quantityModifiers {
    const { quantity } = lineItem;
    const container = document.createElement('div');
    const increase = new Button({
      className: 'edit-icon',
    }).button;
    const reduce = new Button({
      className: 'edit-icon',
    }).button;
    const count = document.createElement('p');
    count.textContent = `${quantity}`;

    container.append(increase, count, reduce);

    return {
      container,
      elements: {
        increase,
        reduce,
        count,
      },
      quantity,
    };
  }

  private addClasses(): void {
    ([
      [this.card, style['basket-card']],
      [this.img.container, 'image'],
      [this.attributes.container, 'attributes'],
      [this.prices.container, 'prices'],
      [this.name, 'name'],
      [this.quantityModifiers.container, 'quantity'],
      [this.quantityModifiers.elements.increase, 'increase'],
      [this.quantityModifiers.elements.reduce, 'reduce'],
      [this.totalPrice.container, 'total'],
      [this.deleteButton, 'delete'],
    ] as const).forEach(([element, className]) => {
      element.classList.add(className);
    });
  }
}

export { BusketCard };
