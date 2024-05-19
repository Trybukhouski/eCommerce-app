import { Routes } from '@interfaces';
import { MainPageMap } from './MainPage.map';

export class MainPageView extends MainPageMap {
  public elements = {
    mainContent: document.createElement('section'),
    errorPage: this.components.errorPage.elements.root,
    root: document.createElement('main'),
  };

  public create(): MainPageView {
    const { mainContent, root } = this.elements;
    root.append(mainContent);

    return this;
  }

  public setContent(content: Routes): void {
    const { mainContent } = this.elements;
    mainContent.childNodes.forEach((child) => child.remove());
    if (content === 'error') {
      mainContent.append(this.elements.errorPage);
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
