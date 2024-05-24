import { Router, Routes, PagesDataModifier, pagesData } from '@routes/index';
import { LocalStorageService } from '@services';
import {
  MainPageActions as MainPage,
  LoginPage,
  ProfilePageUI,
  RegistrPage,
  ErrorPage,
} from './modules';

export class Application {
  private pagesCollection: PagesDataModifier;

  private mainPage: MainPage;

  private router: Router;

  constructor() {
    this.pagesCollection = new PagesDataModifier(pagesData);
    this.blockPages();
    this.router = new Router(this.pagesCollection);
    this.mainPage = new MainPage(this.pagesCollection, this.router);
  }

  public init() {
    this.createMainPage();
    this.addLoginedListener();
    this.routerStaff(); // TODO: add correct name to this method
  }

  private blockPages(): void {
    const isUserAuthorised = LocalStorageService.isUserAuthorised();
    this.pagesCollection.setBlockedPagesAccordingUserStatus(isUserAuthorised);
  }

  private createMainPage(): void {
    this.mainPage.create();
    this.mainPage.addPagesContent([
      ['profilePage', new ProfilePageUI().elem],
      ['loginPage', new LoginPage().elem],
      ['registrationPage', new RegistrPage().elem],
      ['errorPage', new ErrorPage().create().elements.root],
    ]);
  }

  private addLoginedListener(): void {
    this.mainPage.elements.root.addEventListener('logined', (event) => {
      if (event instanceof CustomEvent) {
        if (!event.detail.logined) {
          LocalStorageService.clearAuthorisedToken();
          this.router.setHash('main');
        }
        this.pagesCollection.setBlockedPagesAccordingUserStatus(event.detail.logined);
        const { header } = this.mainPage.components;
        const { nav } = header.components;
        nav.createLinks(this.pagesCollection.getAvailableLinks());
      }
    });
  }

  private routerStaff(): void {
    // TODO: add correct name to this method
    if (this.router.getHash() as Routes) {
      const route = this.router.getHash() as Routes;
      this.mainPage.inform(route);
      const { header } = this.mainPage.components;
      const { nav } = header.components;
      nav.inform(route);
    }

    const { nav } = this.mainPage.components.header.components;

    this.router.addSubscriber(this.mainPage);
    this.router.addSubscriber(nav);
    this.router.observeHashChange();

    document.body.append(this.mainPage.elements.root);
  }
}
