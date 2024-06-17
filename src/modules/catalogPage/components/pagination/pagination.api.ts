import { PaginationState } from './pagination.state';

export class PaginationApi extends PaginationState {
  constructor() {
    super();
    this.changeActiveItemByClick();
  }

  public updateQuantity(quantity: number): void {
    this.updateState(quantity);
    this.drawItems(this.items);
  }

  private changeActiveItemByClick() {
    this.root.addEventListener('click', (event) => {
      if (event.target instanceof HTMLElement && event.target.hasAttribute('data-item')) {
        this.drawItemAsActive(Number(event.target.innerHTML));
        this.root.dispatchEvent(
          new CustomEvent('pagination', {
            bubbles: true,
            detail: {
              page: Number(event.target.innerHTML),
            },
          })
        );
      }
    });
  }
}
