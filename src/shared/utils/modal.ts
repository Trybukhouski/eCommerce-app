import * as styles from './style.module.scss';

export class Modal {
  private modalOverlay: HTMLElement;

  private modal: HTMLElement;

  private closeButton: HTMLElement;

  private contentContainer: HTMLElement;

  private mainImage: HTMLImageElement;

  constructor() {
    this.modalOverlay = document.createElement('div');
    this.modalOverlay.className = styles.modalOverlay;

    this.modal = document.createElement('div');
    this.modal.className = styles.modal;

    this.closeButton = document.createElement('span');
    this.closeButton.className = styles.closeButton;
    this.closeButton.textContent = 'X';

    this.contentContainer = document.createElement('div');
    this.contentContainer.className = styles.contentContainer;

    this.mainImage = document.createElement('img');
    this.mainImage.className = styles['modal-main-image'];

    this.closeButton.addEventListener('click', () => this.closeModal());
    this.modalOverlay.addEventListener('click', (event) => {
      if (event.target === this.modalOverlay) {
        this.closeModal();
      }
    });

    this.modal.appendChild(this.closeButton);
    this.modal.appendChild(this.mainImage);
    this.modal.appendChild(this.contentContainer);
    this.modalOverlay.appendChild(this.modal);
    document.body.appendChild(this.modalOverlay);
  }

  public openModal(): void {
    this.modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  public closeModal(): void {
    this.modalOverlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  public setContent(content: HTMLElement): void {
    this.contentContainer.innerHTML = '';
    this.contentContainer.appendChild(content);
  }

  public setMainImage(src: string): void {
    this.mainImage.src = src;
  }
}
