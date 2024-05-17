import {
  NavActions as Nav,
  BurgerView as Burger,
} from '@modules/mainPage/components/header/components';
import { PagesDataModifierModel } from '../../../../routes/pagesData/interfaces/PagesDataModifierModel';

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
