import { ProductCardModel } from './productCard.model';
import { ProductDetailOptions } from './interfaces/ProductDetailOptions';

export class ProductCardActions extends ProductCardModel {
  constructor(detail: ProductDetailOptions) {
    super(detail);
    this.createSignalThatCardIsSelected();
  }

  private createSignalThatCardIsSelected(): void {
    this.root.addEventListener('click', () => {
      this.root.dispatchEvent(
        new CustomEvent('productIDs', { bubbles: true, detail: { key: this.key, id: this.id } })
      );
    });
  }
}
