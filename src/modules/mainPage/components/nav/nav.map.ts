import { PagesDataModifierModel } from '@routes';
import { CartWidget } from '@shared';
import { checkWhetherLinkIsClicked } from './utils/checkWhetherLinkIsClicked';

export class NavMap {
  protected database: PagesDataModifierModel;

  public components = {
    cartWidget: new CartWidget(),
  };

  constructor(database: PagesDataModifierModel) {
    this.database = database;
  }

  protected utils = {
    checkWhetherLinkIsClicked,
  };
}
