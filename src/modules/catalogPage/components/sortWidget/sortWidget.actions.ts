import { SortTypes } from './intefaces';
import { SortWidgetState } from './sortWidget.state';

export class SortWidgetActions extends SortWidgetState {
  constructor() {
    super();
    this.handleClicks();
  }

  private handleClicks(): void {
    this.root.addEventListener('click', (event) => {
      if (!this.isOpened) {
        this.changeStatus();
        this.update(this.isOpened);
      } else if (event.target instanceof HTMLElement && event.target.tagName === 'P') {
        const newSortType = event.target.innerHTML as SortTypes;
        this.setSortType(newSortType);
        this.changeStatus();
        this.update(this.isOpened, newSortType);
        event.target.dispatchEvent(
          new CustomEvent('sort', {
            bubbles: true,
            detail: {
              sortType: newSortType,
            },
          })
        );
      }
    });
  }
}
