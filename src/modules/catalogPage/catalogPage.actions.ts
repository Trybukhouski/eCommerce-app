import { CatalogPageState } from './catalogPage.state';

export class CatalogPageActions extends CatalogPageState {
  constructor() {
    super();
    this.create();
    this.handleClickOnSortWidget();
  }

  private handleClickOnSortWidget(): void {
    this.root.addEventListener('sort', (event) => {
      if (event instanceof CustomEvent) {
        const sortCollection = this.sortProductCards(event.detail.sortType);
        this.update(sortCollection);
      }
    });
  }
}
