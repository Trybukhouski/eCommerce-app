import { ProductCardView } from './productCard.view/productCard.view';
import { ProductDetailOptions } from './interfaces/ProductDetailOptions';

export class ProductCardModel extends ProductCardView {
  protected id: string;

  protected key: string;

  constructor(detail: ProductDetailOptions) {
    super(detail);
    this.id = detail.id;
    this.key = detail.key;
  }
}
