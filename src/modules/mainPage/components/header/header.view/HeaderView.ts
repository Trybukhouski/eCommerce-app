import { HeaderMap } from '../Header.map';

import * as styles from './styles.module.scss';

export class HeaderView extends HeaderMap {
  public elements = {
    burger: this.components.burger.root,
    logo: document.createElement('h1'),
    nav: this.components.nav.elements.root,
    root: document.createElement('header'),
  };

  public create(): void {
    const { root, logo, nav, burger } = this.elements;
    root.classList.add(styles.container);

    const wrapper = document.createElement('div');
    wrapper.classList.add(styles.wrapper);
    root.append(wrapper);

    logo.innerHTML = `<span>Best</span>Shop`;
    logo.classList.add(styles.logo);
    wrapper.append(logo);

    nav.classList.add(styles.nav);
    wrapper.append(nav);

    wrapper.append(burger);
    burger.classList.add(styles.burger);
  }

  protected navVisibility(visible: true | false): void {
    if (visible) {
      this.elements.nav.removeAttribute('data-display');
    } else {
      this.elements.nav.setAttribute('data-display', 'none');
    }
  }
}
