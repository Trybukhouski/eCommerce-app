import { LinkModel } from '@modules/mainPage/components/nav';
import { Routes } from './routes';

export interface PagesDataModifierModel {
  getAvailableLinks(): LinkModel[];
  getCurrentPageName(): string;
  getPagesHash(): Routes[];
  setBlockedPagesAccordingUserStatus(authorised: boolean): void;
  setCurrentPage(page: Routes): void;
}
