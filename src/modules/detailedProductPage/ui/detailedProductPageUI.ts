import { Button, ButtonOptions } from '@shared';
import mainImagePath from '@assets/images/main-image.jpg';
import thumbnail1Path from '@assets/images/thumbnail1.jpg';
import * as styles from './styles.module.scss';

export class DetailedProductPageUI {
  public elem: HTMLElement;

  private productName: HTMLElement;

  private productDetails: HTMLElement;

  private mainImage: HTMLImageElement;

  private thumbnailsContainer: HTMLElement;

  private productDescription: HTMLElement;

  private priceContainer: HTMLElement;

  private addToCartButton: HTMLElement;

  constructor() {
    this.elem = document.createElement('div');
    this.elem.className = styles['page-container'];

    this.productName = document.createElement('h1');
    this.productName.className = styles['product-name'];
    this.productName.textContent = 'Product Name';

    this.productDetails = document.createElement('div');
    this.productDetails.className = styles['product-details'];

    this.mainImage = document.createElement('img');
    this.mainImage.className = styles['main-image'];
    this.mainImage.src = mainImagePath;
    this.mainImage.alt = 'Main Product Image';

    this.thumbnailsContainer = this.createThumbnailImages([
      thumbnail1Path,
      thumbnail1Path,
      thumbnail1Path,
      thumbnail1Path,
    ]);
    this.productDescription = this.createDescription();
    this.priceContainer = this.createPriceContainer();
    this.addToCartButton = this.createAddToCartButton();

    this.assembleUI();
  }

  private assembleUI(): void {
    this.productDetails.append(
      this.createImageColumn(),
      this.createDescriptionColumn(),
      this.createDetailsColumn()
    );
    this.elem.append(this.productName, this.productDetails);
  }

  private createImageColumn(): HTMLElement {
    const column = document.createElement('div');
    column.className = `${styles.column} ${styles['image-column']}`;
    column.append(this.mainImage, this.thumbnailsContainer);
    return column;
  }

  private createThumbnailImages(paths: string[]): HTMLElement {
    const thumbnails = document.createElement('div');
    thumbnails.className = styles['thumbnail-images'];
    paths.forEach((path) => {
      const img = document.createElement('img');
      img.src = path;
      img.alt = `Thumbnail of ${path}`;
      thumbnails.appendChild(img);
    });
    return thumbnails;
  }

  private createDescriptionColumn(): HTMLElement {
    const column = document.createElement('div');
    column.className = `${styles.column} ${styles['description-column']}`;
    column.appendChild(this.productDescription);
    return column;
  }

  private createDescription(): HTMLElement {
    const description = document.createElement('div');
    description.className = styles['product-description'];
    description.innerHTML = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...</p>
      <p>Price: <span>$1000</span></p>
      <p>Material: <span>Gold</span></p>
      <p>Color: <span>Golden</span></p>`;
    return description;
  }

  private createDetailsColumn(): HTMLElement {
    const column = document.createElement('div');
    column.className = `${styles.column} ${styles['cart-column']}`;
    column.append(this.priceContainer, this.addToCartButton);
    return column;
  }

  private createPriceContainer(): HTMLElement {
    const priceContainer = document.createElement('div');
    priceContainer.className = styles.price;
    priceContainer.innerHTML = `<span class="${styles['current-price']}">$80.00</span>
      <span class="${styles['original-price']}">$100.00</span>`;
    return priceContainer;
  }

  private createAddToCartButton(): HTMLElement {
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
    const { button } = new Button(buttonOptions);
    button.className = styles['add-to-cart'];
    return button;
  }

  public activateElement(elementKey: keyof DetailedProductPageUI): void {
    this.addClass(elementKey, 'active');
  }

  public deactivateElement(elementKey: keyof DetailedProductPageUI): void {
    this.removeClass(elementKey, 'active');
  }

  private addClass(elementKey: keyof DetailedProductPageUI, className: string): void {
    const element = this[elementKey];
    if (element instanceof HTMLElement) {
      element.classList.add(className);
    }
  }

  private removeClass(elementKey: keyof DetailedProductPageUI, className: string): void {
    const element = this[elementKey];
    if (element instanceof HTMLElement) {
      element.classList.remove(className);
    }
  }

  public updateTextContent(elementKey: keyof DetailedProductPageUI, text: string): void {
    const element = this[elementKey];
    if (element instanceof HTMLElement) {
      element.textContent = text;
    }
  }

  public updateClassName(
    elementKey: keyof DetailedProductPageUI,
    className: keyof typeof styles
  ): void {
    const element = this[elementKey];
    if (element instanceof HTMLElement) {
      element.className = styles[className];
    }
  }
}
