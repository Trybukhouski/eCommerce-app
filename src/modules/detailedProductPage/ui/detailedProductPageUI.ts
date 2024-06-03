import { Button, ButtonOptions } from '@shared';
import mainImagePath from '@assets/images/main-image.jpg';
import thumbnail1Path from '@assets/images/thumbnail1.jpg';
import { Slider } from '@root/shared/utils/slider';
import { Modal } from '@root/shared/utils/modal';
import * as styles from './style.module.scss';

export class DetailedProductPageUI {
  public elem: HTMLElement;

  private productName: HTMLElement;

  private productDetails: HTMLElement;

  private mainImage: HTMLImageElement;

  private thumbnailsContainer: HTMLElement;

  private productDescription: HTMLElement;

  private priceContainer: HTMLElement;

  private addToCartButton: HTMLElement;

  private slider!: Slider; // Экземпляр слайдера

  private modal: Modal; // Экземпляр модального окна

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
    this.mainImage.src = mainImagePath;
    this.mainImage.alt = 'Main Product Image';
    this.mainImage.addEventListener('click', () => this.openModal()); // Добавляем обработчик событий для открытия модалки

    const thumbnailPaths = [
      thumbnail1Path,
      thumbnail1Path,
      thumbnail1Path,
      thumbnail1Path,
      thumbnail1Path,
    ];

    this.thumbnailsContainer = this.createThumbnailContainer(thumbnailPaths);

    this.productDescription = this.createDescription();
    this.priceContainer = this.createPriceContainer();
    this.addToCartButton = this.createAddToCartButton();

    this.assembleUI();

    this.modal = new Modal(); // Инициализируем модальное окно
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

    const thumbnailsWrapper = document.createElement('div');
    thumbnailsWrapper.className = styles['thumbnails-wrapper'];
    paths.forEach((path) => {
      const img = document.createElement('img');
      img.src = path;
      img.alt = `Thumbnail of ${path}`;
      thumbnailsWrapper.appendChild(img);
    });

    // Создаем экземпляр слайдера
    // Example: Assuming 2 thumbnails are visible at the same time
    this.slider = new Slider(thumbnailsWrapper, paths.length, 2);

    // Добавляем кнопки управления слайдером
    const prevButton = document.createElement('button');
    prevButton.className = styles['slider-button'];
    prevButton.textContent = '<';
    prevButton.onclick = () => this.slider.showPreviousImage();

    const nextButton = document.createElement('button');
    nextButton.className = styles['slider-button'];
    nextButton.textContent = '>';
    nextButton.onclick = () => this.slider.showNextImage();

    container.append(prevButton, thumbnailsWrapper, nextButton);
    return container;
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

    const mainImage = document.createElement('img');
    mainImage.src = mainImagePath;
    mainImage.alt = 'Main Product Image';
    mainImage.className = styles['modal-main-image'];

    const thumbnailsContainer = this.createThumbnailContainer([
      thumbnail1Path,
      thumbnail1Path,
      thumbnail1Path,
      thumbnail1Path,
      thumbnail1Path,
    ]);

    modalContent.appendChild(mainImage);
    modalContent.appendChild(thumbnailsContainer);

    this.modal.setContent(modalContent);
    this.modal.openModal();
  }
}
