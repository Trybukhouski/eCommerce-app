import { Button, ButtonOptions } from '@shared';
import { Slider } from '@root/shared/utils/slider';
import { Modal } from '@root/shared/utils/modal';
import * as styles from './style.module.scss';

export class DetailedProductPageUI {
  public elem: HTMLElement;

  private productName: HTMLElement;

  private productDetails: HTMLElement;

  public mainImage: HTMLImageElement;

  private thumbnailsContainer: HTMLElement;

  private productDescription: HTMLElement;

  private priceContainer: HTMLElement;

  private addToCartButton: HTMLElement;

  private modal: Modal;

  public imagePaths: string[] = [];

  constructor() {
    this.elem = document.createElement('div');
    this.elem.className = styles['page-container'];

    this.productName = document.createElement('h1');
    this.productName.classList.add(styles['product-name']);
    this.productName.classList.add('title');
    this.productName.textContent = 'Product Name';

    this.productDetails = document.createElement('div');
    this.productDetails.className = styles['product-details'];

    this.mainImage = document.createElement('img');
    this.mainImage.classList.add(styles['main-image']);
    this.mainImage.classList.add('main-image');
    this.mainImage.alt = 'Main Product Image';

    this.thumbnailsContainer = document.createElement('div');
    this.thumbnailsContainer.className = styles['thumbnail-container'];

    this.productDescription = this.createDescription();
    this.priceContainer = this.createPriceContainer();
    this.addToCartButton = this.createAddToCartButton();

    this.assembleUI();

    this.modal = new Modal();
    this.mainImage.addEventListener('click', () => this.openModal());
  }

  public updateSlider(images: string[]): void {
    this.thumbnailsContainer.innerHTML = '';
    const thumbnailsWrapper = document.createElement('div');
    thumbnailsWrapper.className = styles['thumbnails-wrapper'];

    images.forEach((imageUrl) => {
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = 'Product Image';
      thumbnailsWrapper.appendChild(img);
    });

    const prevButton = document.createElement('button');
    prevButton.className = styles['slider-button'];
    prevButton.textContent = '<';

    const nextButton = document.createElement('button');
    nextButton.className = styles['slider-button'];
    nextButton.textContent = '>';

    // eslint-disable-next-line no-new
    new Slider(
      thumbnailsWrapper,
      images.length,
      1,
      prevButton,
      nextButton,
      this.updateMainImage.bind(this)
    );

    this.thumbnailsContainer.append(prevButton, thumbnailsWrapper, nextButton);

    if (images.length > 0) {
      this.updateMainImage(images[0]);
    }
  }

  private updateMainImage(imageUrl: string | undefined): void {
    if (imageUrl) {
      this.mainImage.src = imageUrl;
      this.modal.setMainImage(imageUrl);
    }
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

  private createDescriptionColumn(): HTMLElement {
    const column = document.createElement('div');
    column.className = `${styles.column} ${styles['description-column']}`;
    column.appendChild(this.productDescription);
    return column;
  }

  private createDescription(): HTMLElement {
    const description = document.createElement('div');
    description.classList.add(styles['product-description']);
    description.classList.add('description');
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

  private openModal(): void {
    const modalContent = document.createElement('div');

    const thumbnailsContainer = this.createThumbnailContainer(this.imagePaths);

    modalContent.appendChild(thumbnailsContainer);

    this.modal.setContent(modalContent);
    this.modal.openModal();
  }

  private createThumbnailContainer(paths: string[]): HTMLElement {
    const container = document.createElement('div');
    container.className = styles['thumbnail-container'];

    const thumbnailsWrapper = document.createElement('div');
    thumbnailsWrapper.className = styles['thumbnails-wrapper'];
    paths.forEach((path) => {
      const img = document.createElement('img');
      img.src = path;
      img.alt = `Thumbnail of ${path}`;
      thumbnailsWrapper.appendChild(img);
    });

    const prevButton = document.createElement('button');
    prevButton.className = styles['slider-button'];
    prevButton.textContent = '<';

    const nextButton = document.createElement('button');
    nextButton.className = styles['slider-button'];
    nextButton.textContent = '>';

    // eslint-disable-next-line no-new
    new Slider(
      thumbnailsWrapper,
      paths.length,
      1,
      prevButton,
      nextButton,
      this.updateMainImage.bind(this)
    );

    container.append(prevButton, thumbnailsWrapper, nextButton);
    return container;
  }
}
