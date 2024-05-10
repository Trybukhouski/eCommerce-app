import MainPageMap from '../MainPage.map';

type pages = 'page1' | 'page2' | 'page3' | 'error';

class MainPageView extends MainPageMap {
  private elements = {
    mainContent: (() => {
      const container = document.createElement('section');
      return container;
    })(),
  };

  public root = (() => {
    const container = document.createElement('main');

    container.append(this.elements.mainContent);

    return container;
  })();

  public setContent(content: pages): void {
    this.elements.mainContent.innerHTML = content;
  }
}

export default MainPageView;
