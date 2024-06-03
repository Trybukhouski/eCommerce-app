import { getDetailForProductCard } from '@root/services/productService/utils/getDetailForProductCard';
import { ProductDetailOptions } from '@services';
import { CatalogPageView } from './catalogPage.view';
import { SortTypes } from './components/sortWidget/intefaces';

export class CatalogPageState extends CatalogPageView {
  private productsDetailCollection: ProductDetailOptions[] = [];

  public sortProductCards(type: SortTypes): ProductDetailOptions[] {
    let sortCollection: ProductDetailOptions[] = [];

    switch (type) {
      case 'A-Z':
        sortCollection = this.productsDetailCollection.sort((a, b) =>
          this.compareTitles(a, b, true)
        );
        break;
      case 'Z-A':
        sortCollection = this.productsDetailCollection.sort((a, b) =>
          this.compareTitles(a, b, false)
        );
        break;
      case 'Price to low':
        sortCollection = this.productsDetailCollection.sort((a, b) =>
          this.comparePrices(a, b, false)
        );
        break;
      case 'Price to height':
        sortCollection = this.productsDetailCollection.sort((a, b) =>
          this.comparePrices(a, b, true)
        );
        break;
      default:
        break;
    }

    return sortCollection;
  }

  private compareTitles(
    a: ProductDetailOptions,
    b: ProductDetailOptions,
    ascending: boolean
  ): number {
    return ascending
      ? a.titleText.localeCompare(b.titleText)
      : b.titleText.localeCompare(a.titleText);
  }

  private comparePrices(
    a: ProductDetailOptions,
    b: ProductDetailOptions,
    ascending: boolean
  ): number {
    const getPrice = (product: ProductDetailOptions) =>
      product.priceInfo.discontPrice !== undefined
        ? product.priceInfo.discontPrice
        : product.priceInfo.regularPrice;

    return ascending ? getPrice(a) - getPrice(b) : getPrice(b) - getPrice(a);
  }

  protected async create(): Promise<void> {
    await this.getProductsDetailFromServer();
    this.draw();
    const sortCollection = this.sortProductCards('Price to height');
    this.update(sortCollection, this.getFilterAttributes());
  }

  private async getProductsDetailFromServer(): Promise<void> {
    const productsData = await this.services.ProductService.getProducts();
    productsData.forEach((productData) => {
      const productDetail = getDetailForProductCard(productData);
      this.productsDetailCollection.push(productDetail);
    });
  }

  public getFilterAttributes(): Map<string, Set<string>> {
    const attributes: Map<string, Set<string>> = new Map();
    this.productsDetailCollection.forEach((product) => {
      product.attributes.forEach((attribute) => {
        const attributeValue = attributes.get(attribute.name) || new Set();
        attributeValue.add(attribute.value);
        attributes.set(attribute.name, attributeValue);
      });
    });

    attributes.delete('product-description');
    return attributes;
  }
}
