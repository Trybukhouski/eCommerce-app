import { getDetailForProductCard } from '@root/services/productService/utils/getDetailForProductCard';
import { ProductDetailOptions } from '@services';
import { CatalogPageView } from './catalogPage.view';
import { SortTypes } from './components/sortWidget/intefaces';

export class CatalogPageState extends CatalogPageView {
  private productsDetailCollection: ProductDetailOptions[] = [];

  private filteringProductsDetailCollection: ProductDetailOptions[] = [];

  get currentProductsDetailCollection(): ProductDetailOptions[] {
    return this.filteringProductsDetailCollection.length > 0 || this.components.filter.isActive
      ? this.filteringProductsDetailCollection
      : this.productsDetailCollection;
  }

  public sortProductCards(type: SortTypes): void {
    switch (type) {
      case 'A-Z':
        this.currentProductsDetailCollection.sort((a, b) => this.compareTitles(a, b, true));
        break;
      case 'Z-A':
        this.currentProductsDetailCollection.sort((a, b) => this.compareTitles(a, b, false));
        break;
      case 'Price to low':
        this.currentProductsDetailCollection.sort((a, b) => this.comparePrices(a, b, false));
        break;
      case 'Price to height':
        this.currentProductsDetailCollection.sort((a, b) => this.comparePrices(a, b, true));
        break;
      default:
        break;
    }
  }

  protected filterProductCards(filterConditions: { [key: string]: string[] }): void {
    this.filteringProductsDetailCollection = [];

    this.productsDetailCollection.forEach((product) => {
      const matchesAllConditions = Object.keys(filterConditions).every((key) => {
        return product.attributes.some(
          (attribute) => attribute.name === key && filterConditions[key]?.includes(attribute.value)
        );
      });
      if (matchesAllConditions) {
        this.filteringProductsDetailCollection.push(product);
      }
    });

    this.sortProductCards('Price to height');
    this.components.sortWidget.setSortType('Price to height');
    this.components.sortWidget.update(undefined, 'Price to height');
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
    this.filteringProductsDetailCollection = this.productsDetailCollection;
    this.sortProductCards('Price to height');
    this.update(this.currentProductsDetailCollection, this.getFilterAttributes());
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
