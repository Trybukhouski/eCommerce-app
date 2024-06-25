import cartIcon from '@assets/icons/cart.svg';
import { CartWidgetDependencies } from '../cartWidget.dependencies';
import * as styles from './styles.module.scss';

export class CartWidgetView extends CartWidgetDependencies {
  public root = document.createElement('div');

  private cartCounter = document.createElement('p');

  protected reRender(totalItemsInCart: number): void {
    this.cartCounter.innerHTML = `${totalItemsInCart}`;
  }

  protected render(totalItemsInCart: number): void {
    this.root.classList.add(styles.root);
    this.root.id = 'cart-link';
    const icon = `
    <svg viewBox="${cartIcon.viewBox}" width="50" height="50">
      <use xlink:href="#${cartIcon.id}"/>
    </svg>`;
    this.root.insertAdjacentHTML('afterbegin', icon);

    const cartText = document.createElement('p');
    cartText.innerHTML = 'Basket:';

    this.cartCounter.innerHTML = `${totalItemsInCart}`;

    this.root.append(cartText, this.cartCounter);
  }
}
