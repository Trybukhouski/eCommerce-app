import { CatalogPageState } from './catalogPage.state';

export class CatalogPageActions extends CatalogPageState {
  constructor() {
    super();
    this.create();
    this.handleClickOnSortWidget();
    this.handleFilterActions();
    this.handlePriceFilterActions();
  }

  private handleClickOnSortWidget(): void {
    this.root.addEventListener('sort', (event) => {
      if (event instanceof CustomEvent) {
        this.sortProductCards(event.detail.sortType);
        this.update(this.currentProductsDetailCollection);
      }
    });
  }

  private handleFilterActions(): void {
    this.root.addEventListener('filter', (event) => {
      if (event instanceof CustomEvent) {
        this.filterProductCards(event.detail.filterConditions);
        this.sortProductCards('Price to height');
        this.components.sortWidget.setSortType('Price to height');
        this.components.sortWidget.update(undefined, 'Price to height');
        this.update(this.currentProductsDetailCollection);
      }
    });
  }

  private handlePriceFilterActions(): void {
    this.root.addEventListener('pricefilter', (event) => {
      if (event instanceof CustomEvent) {
        this.filterProductCardsByPrice(event.detail.range);
        this.sortProductCards('Price to height');
        this.components.sortWidget.setSortType('Price to height');
        this.components.sortWidget.update(undefined, 'Price to height');
        this.update(this.currentProductsDetailCollection);
      }
    });
  }
}
