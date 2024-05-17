import { LinkModel } from '@modules/mainPage/components/header/components/nav/nav.view/interfaces';
import { Routes } from './routes';

export interface PagesDataModifierModel {
  getAvailablePages(): LinkModel[];
  getCurrentPageName(): string;
  getPagesHash(): Routes[];
  setBlockedPagesAccordingUserStatus(authorised: boolean): void;
  setCurrentPage(page: Routes): void;
}
