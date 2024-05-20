import { Nav, Burger } from '@modules/mainPage/components';
import { PagesDataModifierModel } from '@routes/index';

export class HeaderMap {
  protected db: PagesDataModifierModel;

  public components: {
    burger: Burger;
    nav: Nav;
  };

  constructor(db: PagesDataModifierModel) {
    this.db = db;

    this.components = {
      burger: new Burger().draw(),
      nav: new Nav(this.db).create(),
    };
  }
}
