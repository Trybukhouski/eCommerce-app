import { PagesDataModifierModel } from '@routes/pagesData/interfaces/PagesDataModifierModel';
import { checkWhetherLinkIsClicked } from './index';

export class NavMap {
  protected db: PagesDataModifierModel;

  constructor(db: PagesDataModifierModel) {
    this.db = db;
  }

  protected utils = {
    checkWhetherLinkIsClicked,
  };
}
