import { LineItem } from '@services';
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
  public data: LineItem;

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

  constructor(lineItem: LineItem) {
    this.data = lineItem;
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
      elements: this.createAttributes(),
    };
    this.attributes.container.append(...this.attributes.elements);

    this.prices = this.addPrices();

    this.card.append(
      this.name,
      this.img.container,
      this.attributes.container,
      this.prices.container
    );

    this.addClasses();
  }

  private createAttributes(): HTMLDivElement[] {
    const attribs = this.data.variant.attributes.filter(
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

  private addPrices(): typeof this.prices {
    const formatPrice = (n: number) =>
      `${Math.trunc(n / 100)}${(n % 1).toPrecision(3).replace(/0/, '')}`;
    const container = document.createElement('div');
    const prices: [number, number] = [
      this.data.price.value.centAmount,
      this.data.totalPrice.centAmount,
    ];
    const pricesElems = prices.map(
      (p): HTMLElement => {
        const priceElem = document.createElement('p');
        priceElem.textContent = formatPrice(p);
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

    if (prices[0] === prices[1]) {
      return obj;
    }

    obj.elements.discounted = {
      elem: pricesElems[1],
      value: prices[1],
    };
    container.append(pricesElems[1]);

    return obj;
  }

  private addClasses(): void {
    ([
      [this.card, style['basket-card']],
      [this.img.container, 'image'],
      [this.attributes.container, 'attributes'],
      [this.prices.container, 'prices'],
      [this.name, 'name'],
    ] as const).forEach(([element, className]) => {
      element.classList.add(className);
    });
  }
}

export { BusketCard };
