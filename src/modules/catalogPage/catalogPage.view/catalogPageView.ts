import { ProductDetailOptions } from '@services';
import { catalogPageMap } from '../catalogPage.map';
import * as styles from './styles.module.scss';

export class CatalogPageView extends catalogPageMap {
  public root = document.createElement('section');

  protected elements = {
    filter: new this.components.Filter().root,
    sortWidget: new this.components.SortWidget().root,
    catalog: document.createElement('div'),
  };

  protected draw(): void {
    const { filter, sortWidget, catalog } = this.elements;
    this.root.classList.add(styles.root);

    const title = document.createElement('h2');
    title.innerHTML = 'Catalog';
    title.classList.add(styles.title);

    const container = document.createElement('div');
    container.classList.add(styles.container);

    const controls = document.createElement('div');
    controls.classList.add(styles.controls);
    controls.append(sortWidget);

    const grid = document.createElement('div');
    grid.classList.add(styles.grid);

    catalog.classList.add(styles.catalog);

    grid.append(controls, catalog);
    container.append(filter, grid);
    this.root.append(title, container);
  }

  protected update(cards: ProductDetailOptions[]): void {
    const { catalog } = this.elements;
    catalog.innerHTML = '';
    cards.forEach((card) => {
      const cardEl = new this.components.ProductCard(card).root;
      cardEl.addEventListener('click', () => {
        cardEl.dispatchEvent(
          new CustomEvent('clickOnCard', {
            bubbles: true,
            detail: {
              id: cardEl.getAttribute('id'),
            },
          })
        );
      });
      catalog.append(cardEl);
    });
  }
}
