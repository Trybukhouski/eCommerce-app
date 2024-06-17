import { ProductDetailOptions } from '@root/services/productService';
import { AddToCartButton } from '@shared';
import { LocalStorageService } from '@services';
import { ProductCardMap } from '../productCard.map';
import * as styles from './styles.module.scss';

export class ProductCardView extends ProductCardMap {
  protected elements = {
    root: document.createElement('div'),
    title: document.createElement('h3'),
    description: document.createElement('p'),
    image: document.createElement('img'),
    regularPrice: document.createElement('p'),
    discontPrice: document.createElement('p'),
  };

  public get root(): HTMLElement {
    return this.elements.root;
  }

  constructor(detail: ProductDetailOptions) {
    super();
    this.create(detail);
  }

  public create(detail: ProductDetailOptions): ProductCardView {
    const { root, title, description, image, regularPrice, discontPrice } = this.elements;
    this.root.classList.add(styles.root);
    this.root.id = detail.id;
    image.classList.add(styles.image);
    image.src = detail.urls.mainImage;
    image.alt = `Image of ${detail.titleText || 'image of the product'}`;
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
    root.append(imageFrame, title, description, price);
    if (LocalStorageService.isUserAuthorised()) {
      root.append(
        new AddToCartButton(
          { text: 'Add to cart', customColor: 'blue' },
          {
            getProductInfo: () => ({
              productId: detail.id,
              variantId: 1,
            }),
          }
        ).button
      );
    }
    return this;
  }
}
