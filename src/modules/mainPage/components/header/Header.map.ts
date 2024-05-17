import Burger from './components/burger/burger.view/Burger.view';
import Nav from './components/nav/Nav.actions';
import { PagesDataModifierModel } from '../../../../routes/pagesData/interfaces/PagesDataModifierModel';

class HeaderMap {
  protected db: PagesDataModifierModel;

  protected components: {
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

export default HeaderMap;
