import { CatalogPageState } from './catalogPage.state';

export class CatalogPageActions extends CatalogPageState {
  constructor() {
    super();
    this.create();
    this.handleClickOnSortWidget();
    this.handleFilterActions();
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
        this.update(this.currentProductsDetailCollection);
      }
    });
  }
}
