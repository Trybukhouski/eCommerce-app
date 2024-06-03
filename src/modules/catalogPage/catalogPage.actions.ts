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
        const sortCollection = this.sortProductCards(event.detail.sortType);
        this.update(sortCollection);
      }
    });
  }

  private handleFilterActions(): void {
    this.root.addEventListener('filter', (event) => {
      if (event instanceof CustomEvent) {
        console.log(event.detail.filterConditions);
      }
    });
  }
}
