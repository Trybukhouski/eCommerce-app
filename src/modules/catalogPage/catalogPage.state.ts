import { getDetailForProductCard } from '@root/services/productService/utils/getDetailForProductCard';
import { ProductDetailOptions } from '@services';
import { CatalogPageView } from './catalogPage.view';

export class CatalogPageState extends CatalogPageView {
  constructor() {
    super();
    this.create();
  }

  private async create(): Promise<void> {
    const productsDetailCollection = await this.getproductsDetailCollection();
    this.draw(productsDetailCollection);
  }

  private async getproductsDetailCollection(): Promise<ProductDetailOptions[]> {
    const productsDetailCollection: ProductDetailOptions[] = [];
    const productsData = await this.services.ProductService.getProducts();
    productsData.forEach((productData) => {
      const productDetail = getDetailForProductCard(productData);
      productsDetailCollection.push(productDetail);
    });

    return productsDetailCollection;
  }
}
