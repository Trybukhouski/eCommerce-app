/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { PageModel } from '@routes';
import { LinkModel, PagesDataModifierModel, PagesDataModel, Routes } from './interfaces';

export class PagesDataModifier implements PagesDataModifierModel {
  private pagesData: PagesDataModel;

  private blockedPages = {
    forAuthorisedUsers: ['login', 'registration'],
    forUnAuthorisedUsers: ['profile', 'signOut'],
  };

  constructor(pagesData: PagesDataModel) {
    this.pagesData = pagesData;
  }

  public getAvailableLinks(): LinkModel[] {
    const result: LinkModel[] = [];
    Object.entries(this.pagesData).forEach((pageObj: [string, PageModel]) => {
      const { hash, name, status, current, type } = pageObj[1];
      if (status === 'available') {
        if (name !== 'card') {
          const linkObj: LinkModel = {
            hash,
            name,
            current,
            type,
          };
          result.push(linkObj);
        }
      }
    });
    return result;
  }

  public getCurrentPageName(): string {
    let newCurrentLink: string;
    const currentLinksObject = Object.values(this.pagesData).filter(
      (pageObj) => pageObj.current === true
    );
    if (currentLinksObject[0] && currentLinksObject.length === 1) {
      newCurrentLink = currentLinksObject[0].name;
    } else {
      newCurrentLink = '111';
      // throw new Error('Not single current page');
    }
    return newCurrentLink;
  }

  public getHashOfCurrentPage(): Routes {
    let newCurrentHash: Routes;
    const currentLinksObject = Object.values(this.pagesData).filter(
      (pageObj) => pageObj.current === true
    );
    if (currentLinksObject[0] && currentLinksObject.length === 1) {
      newCurrentHash = currentLinksObject[0].hash;
    } else {
      throw new Error('Not single current page');
    }
    return newCurrentHash;
  }

  public getPagesHash(): Routes[] {
    return Object.values(this.pagesData).map((obj) => obj.hash);
  }

  public setBlockedPagesAccordingUserStatus(authorised: boolean): void {
    const blockedPages = authorised
      ? this.blockedPages.forAuthorisedUsers
      : this.blockedPages.forUnAuthorisedUsers;

    for (const key in this.pagesData) {
      this.pagesData[key as Routes].status = blockedPages.includes(
        this.pagesData[key as Routes].hash
      )
        ? 'blocked'
        : 'available';
    }
  }

  public setCurrentPage(route: Routes): Routes {
    const newCurrenPage =
      this.pagesData[route].status === 'blocked'
        ? this.pagesData[route].ifBlocked.redirectionPage
        : route;
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in this.pagesData) {
      this.pagesData[key as Routes].current = key === newCurrenPage;
    }
    return newCurrenPage;
  }
}
