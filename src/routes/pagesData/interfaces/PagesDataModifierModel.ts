import { Routes } from './routes';
import { LinkModel } from './LinkModel';

export interface PagesDataModifierModel {
  getAvailableLinks(): LinkModel[];
  getCurrentPageName(): string;
  getHashOfCurrentPage(): Routes;
  getPagesHash(): Routes[];
  setBlockedPagesAccordingUserStatus(authorised: boolean): void;
  setCurrentPage(page: Routes): void;
}
