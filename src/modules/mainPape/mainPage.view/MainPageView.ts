import MainPageMap from '../MainPage.map';
import pages from '../../../interfaces/pages';

class MainPageView extends MainPageMap {
  public elements: { mainContent?: HTMLElement; errorPage: HTMLElement; root?: HTMLElement } = {
    errorPage: this.components.errorPage.elements.root as HTMLElement,
  };

  public create(): MainPageView {
    const container = document.createElement('main');

    const mainContent = document.createElement('section');
    this.elements.mainContent = mainContent;

    container.append(mainContent);

    this.elements.root = container;

    return this;
  }

  public setContent(content: pages): void {
    let { mainContent } = this.elements;
    mainContent = mainContent as HTMLElement;
    mainContent.childNodes.forEach((child) => child.remove());
    if (content === 'error') {
      mainContent.append(this.elements.errorPage);
    } else {
      const page = document.createElement('div');
      page.innerHTML = content;
      mainContent.append(page);
    }
  }

  public inform(page: pages): void {
    this.setContent(page);
  }
}

export default MainPageView;
