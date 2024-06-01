import { catalogPageMap } from '../catalogPage.map';
import * as styles from './styles.module.scss';

export class CatalogPageView extends catalogPageMap {
  public root = document.createElement('section');

  protected elements = {
    filter: new this.components.Filter().root,
  };

  constructor() {
    super();
    this.create();
  }

  private create(): void {
    const { filter } = this.elements;
    this.root.classList.add(styles.root);

    const title = document.createElement('h2');
    title.innerHTML = 'Catalog';
    title.classList.add(styles.title);

    const container = document.createElement('div');
    container.classList.add(styles.container);
    container.append(filter);

    const grid = document.createElement('div');
    grid.classList.add(styles.grid);

    this.root.append(title, container);
  }
}
