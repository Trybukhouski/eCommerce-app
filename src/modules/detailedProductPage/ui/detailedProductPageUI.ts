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

  private sliderIndex = 0;

  private totalThumbnails: number;

  private thumbnailsWrapper: HTMLElement | null = null;

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

    this.thumbnailsContainer = this.createThumbnailContainer([
      thumbnail1Path,
      thumbnail1Path,
      thumbnail1Path,
      thumbnail1Path,
      thumbnail1Path,
    ]);
    this.totalThumbnails = 4;

    this.productDescription = this.createDescription();
    this.priceContainer = this.createPriceContainer();
    this.addToCartButton = this.createAddToCartButton();

    this.assembleUI();
    this.updateThumbnails();
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

  private createThumbnailContainer(paths: string[]): HTMLElement {
    const container = document.createElement('div');
    container.className = styles['thumbnail-container'];

    const prevButton = document.createElement('button');
    prevButton.className = styles['slider-button'];
    prevButton.textContent = '<';
    prevButton.onclick = this.showPreviousImage.bind(this);

    const nextButton = document.createElement('button');
    nextButton.className = styles['slider-button'];
    nextButton.textContent = '>';
    nextButton.onclick = this.showNextImage.bind(this);

    container.appendChild(prevButton);

    const thumbnailsWrapper = document.createElement('div');
    thumbnailsWrapper.className = styles['thumbnails-wrapper'];
    this.thumbnailsWrapper = thumbnailsWrapper;
    paths.forEach((path) => {
      const img = document.createElement('img');
      img.src = path;
      img.alt = `Thumbnail of ${path}`;
      thumbnailsWrapper.appendChild(img);
    });

    container.appendChild(thumbnailsWrapper);
    container.appendChild(nextButton);

    return container;
  }

  private showPreviousImage(): void {
    if (this.sliderIndex > 0) {
      this.sliderIndex--;
      this.updateThumbnails();
    }
  }

  private showNextImage(): void {
    if (this.sliderIndex < this.totalThumbnails - 1) {
      this.sliderIndex++;
      this.updateThumbnails();
    }
  }

  private updateThumbnails(): void {
    if (this.thumbnailsWrapper && this.thumbnailsWrapper.firstElementChild) {
      // Ensure the first child is treated as an HTMLElement
      const firstChild = this.thumbnailsWrapper.firstElementChild as HTMLElement;
      const thumbnailWidth = firstChild.offsetWidth + 1;
      this.thumbnailsWrapper.style.transform = `translateX(${
        -this.sliderIndex * thumbnailWidth
      }px)`;
    }
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
}
