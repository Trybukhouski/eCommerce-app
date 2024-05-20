import NavView from './nav.view/Nav.view';

export class NavActions extends NavView {
  public create(): NavActions {
    super.create();
    this.createSignalAboutClickOnLink();

    return this;
  }

  private createSignalAboutClickOnLink(): void {
    this.elements.root.addEventListener('click', (event) => {
      const target = this.utils.checkWhetherLinkIsClicked(event);
      if (target) {
        const redirection = target.getAttribute('data-name');
        target.dispatchEvent(
          new CustomEvent('clickOnNav', {
            bubbles: true,
            detail: {
              redirection,
            },
          })
        );
      }
    });
  }
}

export default NavActions;
