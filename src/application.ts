import { pagesData, PagesDataModifier, Router, Routes } from '@routes';
import { BackendService, CartService, LocalStorageService } from '@services';
import {
  CatalogPage,
  DetailedProductPage,
  ErrorPage,
  LoginPage,
  MainPageActions as MainPage,
  ProfilePage,
  RegistrPage,
  BasketPage,
  AboutUsPage,
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

  public init(): void {
    this.createMainPage();
    this.addLoggedInListener();
    this.routerStaff(); // TODO: add correct name to this method
  }

  private blockPages(): void {
    const isUserAuthorised = LocalStorageService.isUserAuthorised();
    this.pagesCollection.setBlockedPagesAccordingUserStatus(isUserAuthorised);
  }

  private createMainPage(): void {
    this.mainPage.create();
    this.mainPage.addPagesContent([
      ['profilePage', new ProfilePage().elem],
      ['loginPage', new LoginPage().elem],
      ['registrationPage', new RegistrPage().elem],
      ['errorPage', new ErrorPage().create().elements.root],
      ['catalogPage', new CatalogPage().root],
      ['cardPage', new DetailedProductPage().elem],
      ['basketPage', new BasketPage().elem],
      ['aboutPage', new AboutUsPage().elem],
    ]);
  }

  private addLoggedInListener(): void {
    this.mainPage.elements.root.addEventListener('logined', async (event) => {
      if (event instanceof CustomEvent) {
        if (!event.detail.logined) {
          LocalStorageService.clearAuthorisedToken();
          this.router.setHash('main');
        }
        this.pagesCollection.setBlockedPagesAccordingUserStatus(event.detail.logined);
        const { header } = this.mainPage.components;
        const { nav } = header.components;
        nav.createLinks(this.pagesCollection.getAvailableLinks());
        const promise = new Promise((resolve) => {
          if (!event.detail.logined) {
            resolve(BackendService.getToken(true));
          }
        });
        promise
          .then(() => {
            return CartService.getCart(true);
          })
          .then((cart) => {
            if (cart) {
              CartService.createChangeCountItemsSignal(cart);
            }
          });
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
