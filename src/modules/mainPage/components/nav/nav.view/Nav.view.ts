import { Routes, LinkModel } from '@routes';
import { NavMap } from '../nav.map';
import * as styles from './styles.module.scss';

class NavView extends NavMap {
  public elements = {
    root: document.createElement('nav'),
    navByShop: document.createElement('div'),
    navByAccount: document.createElement('div'),
  };

  protected create(): NavView {
    const { root, navByShop, navByAccount } = this.elements;

    root.classList.add(styles.nav);
    navByShop.classList.add(styles.subNav);
    navByAccount.classList.add(styles.subNav);

    root.append(navByShop);
    root.append(navByAccount);

    this.createLinks(this.database.getAvailableLinks());

    return this;
  }

  public createLinks(linksObject: LinkModel[]): void {
    Array.from(this.elements.navByAccount.children).forEach((el) => el.remove());
    Array.from(this.elements.navByShop.children).forEach((el) => el.remove());
    linksObject.forEach((linkObject) => {
      let link: HTMLElement;
      if (linkObject.name === 'basket') {
        link = this.components.cartWidget.root;
      } else {
        link = document.createElement('a');
        link.innerHTML = `${linkObject.name[0]?.toUpperCase()}${linkObject.name
          .slice(1)
          .toLowerCase()}`;
        link.classList.add(styles.link);
      }
      link.setAttribute('data-name', linkObject.hash as Routes);
      link.setAttribute('data-current', 'false');
      switch (linkObject.type) {
        case 'shop':
          this.elements.navByShop.append(link);
          break;
        case 'account':
          this.elements.navByAccount.append(link);
          break;
        default:
          break;
      }
    });
  }

  public setActiveLinkAccordingCurrentPage(currentPageName: string): void {
    const { navByShop, navByAccount } = this.elements;
    const links = [...navByShop.children, ...navByAccount.children];
    links.forEach((link) => {
      const linkName = link.getAttribute('data-name');
      if (linkName === currentPageName) {
        link.setAttribute('data-current', 'true');
      } else {
        link.setAttribute('data-current', 'false');
      }
    });
  }

  public inform(name: Routes): void {
    this.setActiveLinkAccordingCurrentPage(name);
  }
}

export default NavView;
