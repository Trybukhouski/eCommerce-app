import { ProductDetailOptions } from '@services';
import { AddToCartButton } from '@shared';
import { catalogPageMap } from '../catalogPage.map';
import * as styles from './styles.module.scss';

export class CatalogPageView extends catalogPageMap {
  public root = document.createElement('section');

  protected elements = {
    filter: this.components.filter.root,
    sortWidget: this.components.sortWidget.root,
    catalog: document.createElement('div'),
    pagination: this.components.pagination.root,
  };

  protected cardsPerList = 4;

  protected draw(): void {
    const { filter, sortWidget, catalog, pagination } = this.elements;
    this.root.classList.add(styles.root);

    const title = document.createElement('h2');
    title.innerHTML = 'Catalog';
    title.classList.add(styles.title);

    const container = document.createElement('div');
    container.classList.add(styles.container);

    const controls = document.createElement('div');
    controls.classList.add(styles.controls);
    controls.append(sortWidget, pagination);

    const grid = document.createElement('div');
    grid.classList.add(styles.grid);

    catalog.classList.add(styles.catalog);

    grid.append(controls, catalog);
    container.append(filter, grid);
    this.root.append(title, container);
  }

  protected update(
    cards: ProductDetailOptions[],
    filterAttributes?: Map<string, Set<string>>
  ): void {
    if (filterAttributes) {
      this.components.filter.update(filterAttributes);
    }
    const { catalog } = this.elements;
    catalog.innerHTML = '';
    cards.forEach((card, i) => {
      const firstCardIndex = (this.components.pagination.current - 1) * this.cardsPerList;
      const lastCardIndex = firstCardIndex + this.cardsPerList;
      if (i >= firstCardIndex && i < lastCardIndex) {
        const component = new this.components.ProductCard(card);
        const cardEl = component.root;
        cardEl.addEventListener('click', (event) => {
          cardEl.dispatchEvent(
            new CustomEvent('clickOnCard', {
              bubbles: true,
              detail: {
                id: cardEl.getAttribute('id'),
                target: event.target,
              },
            })
          );
        });
        cardEl.append(new AddToCartButton({}, component).button);
        catalog.append(cardEl);
      }
    });
    this.components.pagination.updateQuantity(Math.ceil(cards.length / this.cardsPerList));
  }
}
