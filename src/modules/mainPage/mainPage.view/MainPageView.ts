import { Routes } from '@routes';
import { MainPageMap } from './MainPage.map';
import * as styles from './styles.module.scss';
import { PagesElements } from './interfaces';

export class MainPageView extends MainPageMap {
  public elements: PagesElements = {
    header: this.components.header.elements.root,
    mainContent: document.createElement('section'),
    root: document.createElement('main'),
  };

  public addPagesContent(pairs: [keyof PagesElements, HTMLElement][]): void {
    pairs.forEach(([key, value]) => {
      this.elements[key] = value;
    });
  }

  public create(): MainPageView {
    const { header, mainContent, root } = this.elements;
    header.classList.add(styles.header);
    root.append(header);
    root.append(mainContent);

    return this;
  }

  public setContent(content: Routes): void {
    const { mainContent } = this.elements;
    mainContent.childNodes.forEach((child) => child.remove());

    const key = `${content}Page`;
    const pageElement = this.elements[key as keyof PagesElements];
    if (pageElement) {
      mainContent.append(pageElement);
    } else {
      const page = document.createElement('div');
      page.innerHTML = content;
      mainContent.append(page);
    }
  }

  public inform(page: Routes): void {
    this.setContent(page);
  }
}
