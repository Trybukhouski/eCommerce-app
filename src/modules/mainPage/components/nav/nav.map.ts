import { PagesDataModifierModel } from '@routes';
import { checkWhetherLinkIsClicked } from './utils/checkWhetherLinkIsClicked';

export class NavMap {
  protected database: PagesDataModifierModel;

  constructor(database: PagesDataModifierModel) {
    this.database = database;
  }

  protected utils = {
    checkWhetherLinkIsClicked,
  };
}
