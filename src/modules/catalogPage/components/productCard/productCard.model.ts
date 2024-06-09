import { ProductDetailOptions } from '@root/services/productService';
import { ProductCardView } from './productCard.view/productCard.view';

export class ProductCardModel extends ProductCardView {
  protected id: string;

  protected key: string;

  constructor(detail: ProductDetailOptions) {
    super(detail);
    this.id = detail.id;
    this.key = detail.key;
  }

  public getProductInfo() {
    return {
      productId: this.id,
      variantId: 1,
    };
  }
}
