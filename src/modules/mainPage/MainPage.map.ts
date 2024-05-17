import { ErrorPageView as ErrorPage } from '@modules/errorPage/index';
import { PagesDataModifierModel } from '@routes/pagesData/interfaces/PagesDataModifierModel';
import { RouterModel } from '@routes/interfaces/routerModel';
import { HeaderActions as Header } from './components/header/HeaderActions';
import { RegistrPage as RegistrationPage } from '../auth/registrationPage/index';
import { LoginPage } from '../auth/loginPage/index';

export class MainPageMap {
  protected db: PagesDataModifierModel;

  public components: {
    header: Header;
  };

  protected pages: {
    errorPage: ErrorPage;
    registrationPage: RegistrationPage;
    loginPage: RegistrationPage;
  } = {
    errorPage: new ErrorPage().create(),
    registrationPage: new RegistrationPage(),
    loginPage: new LoginPage(),
  };

  protected services: {
    router: RouterModel;
  };

  constructor(db: PagesDataModifierModel, router: RouterModel) {
    this.db = db;

    this.components = {
      header: new Header(this.db).create(),
    };

    this.services = {
      router,
    };
  }
}
