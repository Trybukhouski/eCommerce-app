import { ErrorPage } from '@modules/errorPage';
import { PagesDataModifierModel, RouterModel } from '@routes/index';
import { RegistrPage as RegistrationPage, LoginPage } from '@modules/auth';
import { Header } from '@modules/mainPage/components';

export class MainPageMap {
  public components: {
    header: Header;
  };

  protected database: PagesDataModifierModel;

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

  constructor(database: PagesDataModifierModel, router: RouterModel) {
    this.database = database;

    this.components = {
      header: new Header(this.database).create(),
    };

    this.services = {
      router,
    };
  }
}
