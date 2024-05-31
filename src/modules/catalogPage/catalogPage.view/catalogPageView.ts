import * as styles from './styles.module.scss';

export class CatalogPageView {
  public root = document.createElement('section');

  constructor() {
    this.create();
  }

  private create(): void {
    this.root.classList.add(styles.root);

    const title = document.createElement('h2');
    title.innerHTML = 'Catalog';
    title.classList.add(styles.title);

    const container = document.createElement('div');
    container.classList.add(styles.container);

    this.root.append(title, container);
  }
}
