import { LineItem } from '@services';

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

  public img: HTMLImageElement;

  public attributes: {
    container: HTMLElement;
    elements: HTMLElement[];
  };

  public prices?: {
    container: HTMLElement;
    elements: PriceElements;
  };

  constructor(lineItem: LineItem) {
    this.data = lineItem;
    this.card = document.createElement('section');

    this.name = document.createElement('h3');
    this.name.textContent = lineItem.name['en-GB'];
    this.img = document.createElement('img');
    this.img.src = lineItem.variant.images[0]?.url ?? '';

    this.attributes = {
      container: document.createElement('div'),
      elements: this.createAttributes(),
    };
    this.attributes.container.append(...this.attributes.elements);

    this.prices = this.addPrices();

    this.card.append(this.name, this.img, this.attributes.container, this.prices.container);
  }

  private createAttributes() {
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

  private addPrices() {
    const container = document.createElement('div');
    const prices = [this.data.price.value.centAmount, this.data.totalPrice.centAmount] as const;
    const priceElem = document.createElement('p');
    priceElem.textContent = prices[0].toString();
    container.append(priceElem);

    if (prices[0] === prices[1]) {
      const obj: typeof this.prices = {
        container,
        elements: {
          price: {
            elem: priceElem,
            value: prices[0],
          },
        },
      };
      return obj;
    }

    const discountedElem = document.createElement('p');
    discountedElem.textContent = prices[1].toString();
    container.append(discountedElem);
    const obj: typeof this.prices = {
      container,
      elements: {
        price: {
          elem: priceElem,
          value: prices[0],
        },
        discounted: {
          elem: discountedElem,
          value: prices[1],
        },
      },
    };
    return obj;
  }
}

export { BusketCard };
