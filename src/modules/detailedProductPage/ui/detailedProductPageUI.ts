import { Button, ButtonOptions } from '@shared';
import mainImagePath from '../../assets/images/main-image.jpg';
import thumbnail1Path from '../../assets/images/thumbnail1.jpg';
import * as styles from './styles.module.scss';

export class DetailedProductPageUI {
  public elem: HTMLElement;

  constructor() {
    this.elem = this.createUI();
  }

  private createUI(): HTMLElement {
    const container = document.createElement('div');
    container.className = styles['page-container'];

    this.createProductName(container);
    this.createProductDetails(container);

    return container;
  }

  private createProductName(parent: HTMLElement) {
    const productName = document.createElement('h1');
    productName.className = styles['product-name'];
    productName.textContent = 'Product Name';
    parent.appendChild(productName);
  }

  private createProductDetails(parent: HTMLElement) {
    const productDetails = document.createElement('div');
    productDetails.className = styles['product-details'];
    parent.appendChild(productDetails);

    this.createImageColumn(productDetails);
    this.createDescriptionColumn(productDetails);
    this.createDetailsColumn(productDetails);
  }

  private createImageColumn(parent: HTMLElement) {
    const column1 = document.createElement('div');
    column1.className = `${styles.column} ${styles['image-column']}`;
    parent.appendChild(column1);

    const mainImage = document.createElement('img');
    mainImage.src = mainImagePath;
    mainImage.alt = 'Main Product Image';
    mainImage.className = styles['main-image'];
    column1.appendChild(mainImage);

    const thumbnailImages = document.createElement('div');
    thumbnailImages.className = styles['thumbnail-images'];
    [thumbnail1Path, thumbnail1Path, thumbnail1Path, thumbnail1Path].forEach((src) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Thumbnail ${src}`;
      thumbnailImages.appendChild(img);
    });
    column1.appendChild(thumbnailImages);
  }

  private createDescriptionColumn(parent: HTMLElement) {
    const column2 = document.createElement('div');
    column2.className = `${styles.column} ${styles['description-column']}`;
    parent.appendChild(column2);

    const productDescription = document.createElement('div');
    productDescription.className = styles['product-description'];
    column2.appendChild(productDescription);

    const descriptionText = document.createElement('p');
    descriptionText.textContent =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum....';
    productDescription.appendChild(descriptionText);

    const price = document.createElement('p');
    price.innerHTML = 'Price: <span>$ 1000</span>';
    productDescription.appendChild(price);

    const material = document.createElement('p');
    material.innerHTML = 'Material: <span>Gold</span>';
    productDescription.appendChild(material);

    const color = document.createElement('p');
    color.innerHTML = 'Color: <span>Golden</span>';
    productDescription.appendChild(color);
  }

  private createDetailsColumn(parent: HTMLElement) {
    const column3 = document.createElement('div');
    column3.className = `${styles.column} ${styles['cart-column']}`;
    parent.appendChild(column3);

    const priceContainer = document.createElement('div');
    priceContainer.className = styles.price;
    column3.appendChild(priceContainer);

    const currentPrice = document.createElement('span');
    currentPrice.className = styles['current-price'];
    currentPrice.textContent = '$80.00';
    priceContainer.appendChild(currentPrice);

    const originalPrice = document.createElement('span');
    originalPrice.className = styles['original-price'];
    originalPrice.textContent = '$100.00';
    priceContainer.appendChild(originalPrice);

    const buttonOptions: ButtonOptions = {
      text: 'Add to Cart',
      type: 'button',
      isLink: false,
      disabled: false,
      icon: {
        sprite: undefined,
        towhere: 'start',
      },
    };
    const addToCartButton = new Button(buttonOptions);
    addToCartButton.button.classList.add(styles['small-button']);
    column3.appendChild(addToCartButton.button);
  }
}
