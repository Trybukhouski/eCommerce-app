import { SortWidgetView } from './sortWidget.view';
import { SortTypes } from './intefaces';

export class SortWidgetState extends SortWidgetView {
  protected isOpened = false;

  private sortConfig: Map<SortTypes, boolean> = new Map([
    ['Price to height', false],
    ['Price to low', false],
    ['A-Z', false],
    ['Z-A', false],
  ]);

  constructor() {
    super();
    this.setSortType('Price to height');
    this.draw(this.sortConfig, this.isOpened);
  }

  protected getSortTypes(): SortTypes[] {
    return Array.from(this.sortConfig.keys());
  }

  public setSortType(type: SortTypes): void {
    this.sortConfig.forEach((_, key) => {
      this.sortConfig.set(key, false);
    });
    this.sortConfig.set(type, true);
  }

  protected changeStatus(): void {
    this.isOpened = !this.isOpened;
  }
}
