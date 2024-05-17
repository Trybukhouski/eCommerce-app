/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { PageModel } from 'routes/pagesData/interfaces/PageModel';
import { PagesDataModifierModel } from './interfaces/PagesDataModifierModel';
import { PagesDataModel } from './interfaces/pagesDataModel';
import LinkModel from '../../modules/mainPage/components/header/components/nav/nav.view/interfaces/LinkModel';
import { Routes } from './interfaces/routes';

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
      const { hash, name, status, current, type } = pageObj[1];
      if (status === 'available') {
        const linkObj: LinkModel = {
          hash,
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
    if (currentLinksObject[0] && currentLinksObject.length === 1) {
      newCurrentLink = currentLinksObject[0].name;
    } else {
      throw new Error('Not single current page');
    }
    return newCurrentLink;
  }

  public getPagesHash(): Routes[] {
    return Object.values(this.pagesData).map((obj) => obj.hash);
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

  public setCurrentPage(route: Routes): Routes {
    let finalHash: Routes;
    const pageObjects = Object.values(this.pagesData);
    pageObjects.forEach((obj) => {
      obj.current = false;
    });
    const filteredPageObjects = pageObjects.filter((obj) => obj.hash === route);
    if (filteredPageObjects[0] && filteredPageObjects.length === 1) {
      if (filteredPageObjects[0].status === 'blocked') {
        const newCurrentPage = filteredPageObjects[0].ifBlocked.redirectionPage;
        this.pagesData[newCurrentPage].current === true;
        finalHash = this.pagesData[newCurrentPage].hash;
      } else {
        filteredPageObjects[0].current === true;
        finalHash = filteredPageObjects[0].hash;
      }
    } else {
      throw new Error('More than one objects have the same hash');
    }

    return finalHash;
  }
}
