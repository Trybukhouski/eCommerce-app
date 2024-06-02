import { SortTypes } from '../intefaces';
import * as styles from './styles.module.scss';

export class SortWidgetView {
  public root = document.createElement('div');

  protected draw(sortConfig: Map<SortTypes, boolean>, isOpened: boolean): void {
    this.root.classList.add(styles.sortWidget);
    this.root.setAttribute('data-opened', `${isOpened}`);
    sortConfig.forEach((_, key) => {
      const item = document.createElement('p');
      item.innerHTML = key;
      this.root.append(item);
    });
  }

  protected update(isOpened?: boolean, type?: SortTypes) {
    if (type) {
      Array.from(this.root.children).forEach((child) => {
        if (child.innerHTML === type) {
          this.root.insertBefore(child, this.root.firstChild);
        }
      });
    }

    this.root.setAttribute('data-opened', `${isOpened}`);
  }
}
