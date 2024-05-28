import { ProductCardMap } from '../productCard.map';
import { ProductDetailOptions } from '../interfaces/ProductDetailOptions';
import * as styles from './styles.module.scss';

export class ProductCardView extends ProductCardMap {
  protected elements = {
    root: document.createElement('div'),
    title: document.createElement('h3'),
    description: document.createElement('p'),
    image: document.createElement('img'),
    regularPrice: document.createElement('p'),
    discontPrice: document.createElement('p'),
    button: new this.components.Button({ text: 'Add to cart', customColor: 'blue' }).button,
  };

  public get root(): HTMLElement {
    return this.elements.root;
  }

  constructor(detail: ProductDetailOptions) {
    super();
    this.create(detail);
  }

  public create(detail: ProductDetailOptions): ProductCardView {
    const { root, title, description, image, regularPrice, discontPrice, button } = this.elements;
    this.root.classList.add(styles.root);
    image.classList.add(styles.image);
    image.src = detail.urls.mainImage;
    const imageFrame = document.createElement('div');
    imageFrame.classList.add(styles.imageFrame);
    imageFrame.append(image);
    title.innerHTML = detail.titleText;
    title.classList.add(styles.title);
    description.innerHTML = detail.descriptionText;
    description.classList.add(styles.description);
    const price = document.createElement('div');
    price.classList.add(styles.price);
    if (detail.priceInfo.discontPrice) {
      discontPrice.innerHTML = `$${detail.priceInfo.discontPrice}`;
      price.append(discontPrice);
    }
    regularPrice.innerHTML = `$${detail.priceInfo.regularPrice}`;
    price.append(regularPrice);
    root.append(imageFrame);
    root.append(title);
    root.append(description);
    root.append(price);
    root.append(button);

    return this;
  }
}
