import * as styles from './styles.module.scss';

export class PaginationView {
  public root = document.createElement('div');

  public drawItemAsActive(itemIndex: number): void {
    const items = this.root.children;
    Array.from(items).forEach((item) => item.removeAttribute('data-current'));
    if (items[itemIndex - 1] && items[itemIndex - 1] instanceof HTMLElement) {
      items[itemIndex - 1]?.setAttribute('data-current', 'true');
    }
  }

  protected drawItems(items: number): void {
    this.root.style.display = items === 1 ? 'none' : '';
    this.root.classList.add(styles.root);
    this.root.innerHTML = '';
    for (let i = 1; i <= items; i += 1) {
      const item = document.createElement('div');
      item.classList.add(styles.item);
      item.setAttribute('data-item', 'true');
      item.innerHTML = `${i}`;
      this.root.append(item);
      this.drawItemAsActive(1);
    }
  }
}
