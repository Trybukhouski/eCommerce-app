import { CatalogPageState } from './catalogPage.state';

export class CatalogPageActions extends CatalogPageState {
  constructor() {
    super();
    this.handleClickOnSortWidget();
  }

  private handleClickOnSortWidget(): void {
    this.root.addEventListener('sort', (event) => {
      if (event instanceof CustomEvent) {
        console.log(event.detail.sortType);
      }
    });
  }
}
