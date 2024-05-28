import { PagesDataModifierModel } from '@routes';
import { Burger } from '../burger';
import { Nav } from '../nav';

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
