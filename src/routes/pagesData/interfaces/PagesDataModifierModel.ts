import LinkModel from '../../../modules/mainPage/components/header/components/nav/nav.view/interfaces/LinkModel';

export interface PagesDataModifierModel {
  getAvailablePages(): LinkModel[];
  getCurrentPageName(): string;
  setBlockedPagesAccordingUserStatus(authorised: boolean): void;
}
