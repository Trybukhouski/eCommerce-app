import { MainPageView } from './index';

export class MainPageActions extends MainPageView {
  public create(): MainPageView {
    super.create();
    this.updateHashAccordingClickInNavLink();
    return this;
  }

  private updateHashAccordingClickInNavLink() {
    this.elements.root.addEventListener('clickOnNav', (event) => {
      if (event instanceof CustomEvent) {
        const incomingHash = event.detail.redirection;
        const newHash = this.database.setCurrentPage(incomingHash);
        this.services.router.setHash(`${newHash}`);
      }
    });
  }
}
