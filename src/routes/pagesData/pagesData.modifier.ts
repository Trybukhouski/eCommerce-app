/* eslint-disable no-param-reassign */
import { PageModel } from 'routes/pagesData/interfaces/PageModel';
import { PagesDataModifierModel } from './interfaces/PagesDataModifierModel';
import { PagesDataModel } from './interfaces/pagesDataModel';
import LinkModel from '../../modules/mainPage/components/header/components/nav/nav.view/interfaces/LinkModel';

export class PagesDataModifier implements PagesDataModifierModel {
  private pagesData: PagesDataModel;

  private blockedPages = {
    forAuthorisedUsers: ['login', 'registration'],
    forUnAuthorisedUsers: ['profile', 'signOut'],
  };

  constructor(pagesData: PagesDataModel) {
    this.pagesData = pagesData;
  }

  public getAvailablePages(): LinkModel[] {
    const result: LinkModel[] = [];
    Object.entries(this.pagesData).forEach((pageObj: [string, PageModel]) => {
      const { name, status, current, type } = pageObj[1];
      if (status === 'available') {
        const linkObj: LinkModel = {
          name,
          current,
          type,
        };
        result.push(linkObj);
      }
    });
    return result;
  }

  public getCurrentPageName(): string {
    let newCurrentLink: string;
    const currentLinksObject = Object.values(this.pagesData).filter(
      (pageObj) => pageObj.current === true
    );
    if (currentLinksObject[0]) {
      newCurrentLink = currentLinksObject[0].name;
    } else {
      throw new Error('Not single current page');
    }
    return newCurrentLink;
  }

  public setBlockedPagesAccordingUserStatus(authorised: boolean): void {
    Object.entries(this.pagesData).forEach(([pageName, pageObject]) => {
      if (authorised) {
        if (this.blockedPages.forAuthorisedUsers.includes(pageName)) {
          pageObject.status = 'blocked';
        }
      } else if (this.blockedPages.forUnAuthorisedUsers.includes(pageName)) {
        pageObject.status = 'blocked';
      } else {
        pageObject.status = 'available';
      }
    });
  }
}
