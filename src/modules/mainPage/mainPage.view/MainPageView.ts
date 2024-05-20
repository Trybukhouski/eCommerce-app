import { Routes } from '@routes/pagesData/interfaces/routes';
import { MainPageMap } from '../MainPage.map'; // TODO: Разобраться, почему не работает @modules/mainPage/index
import * as styles from './styles.module.scss';

export class MainPageView extends MainPageMap {
  public elements = {
    header: this.components.header.elements.root,
    mainContent: document.createElement('section'),
    errorPage: this.pages.errorPage.elements.root,
    registrationPage: this.pages.registrationPage.elem,
    loginPage: this.pages.loginPage.elem,
    root: document.createElement('main'),
  };

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
    switch (
      content // TODO: Переписать на универсальный метод без ветвления
    ) {
      case 'error':
        mainContent.append(this.elements.errorPage);
        break;
      case 'registration':
        mainContent.append(this.elements.registrationPage);
        break;
      case 'login':
        mainContent.append(this.elements.loginPage);
        break;
      default: {
        const page = document.createElement('div');
        page.innerHTML = content;
        mainContent.append(page);
      }
    }
  }

  public inform(page: Routes): void {
    this.setContent(page);
  }
}
