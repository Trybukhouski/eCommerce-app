import { PaginationView } from './pagination.view.ts/paginationView';

export class PaginationState extends PaginationView {
  public current = 1;

  protected items = 1;

  protected set itemsQuantity(quantity: number) {
    this.items = quantity < 1 ? 1 : quantity;
  }

  protected set currentItem(current: number) {
    this.current = current > this.items ? this.items : current;
  }

  protected updateState(itemsQuantity: number): void {
    this.itemsQuantity = itemsQuantity;
    this.current = 1;
  }
}
