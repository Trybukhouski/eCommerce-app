import { ProductDetailOptions } from '@services';
import { catalogPageMap } from '../catalogPage.map';
import * as styles from './styles.module.scss';

export class CatalogPageView extends catalogPageMap {
  public root = document.createElement('section');

  protected elements = {
    filter: new this.components.Filter().root,
  };

  protected draw(cards: ProductDetailOptions[]): void {
    const { filter } = this.elements;
    this.root.classList.add(styles.root);

    const title = document.createElement('h2');
    title.innerHTML = 'Catalog';
    title.classList.add(styles.title);

    const container = document.createElement('div');
    container.classList.add(styles.container);

    const grid = document.createElement('div');
    grid.classList.add(styles.grid);

    container.append(filter, grid);

    this.root.append(title, container);

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
      grid.append(cardEl);
    });
  }
}
