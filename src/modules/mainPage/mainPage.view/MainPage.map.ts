import { PagesDataModifierModel, RouterModel } from '@routes/index';
import { Header } from '../components';

export class MainPageMap {
  public components: {
    header: Header;
  };

  protected database: PagesDataModifierModel;

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
