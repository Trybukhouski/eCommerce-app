import { AboutUsPageUI } from '@root/modules/aboutUsPage/ui/aboutUsPageUi';
import { teamMembers } from '../../../mocks/teamMembers';

class AboutUsPage {
  public elem: HTMLElement;

  private uiApi: AboutUsPageUI;

  constructor() {
    this.uiApi = new AboutUsPageUI(teamMembers);
    this.elem = this.uiApi.elem;
  }
}

export { AboutUsPage };
