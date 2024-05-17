import HeaderView from './header.view/HeaderView';

export class HeaderActions extends HeaderView {
  public create(): HeaderActions {
    super.create();
    this.closeNavAfterClickOnLink();
    this.changeNavVisibilityAfterClickOnBurger();
    this.changeHeaderViewAfterWindowResize();
    this.setHeaderConfig();

    return this;
  }

  private closeNavAfterClickOnLink(): void {
    this.elements.root.addEventListener('clickOnNav', () => {
      if (this.isTabletView()) {
        this.elements.burger.click();
      }
    });
  }

  private changeNavVisibilityAfterClickOnBurger(): void {
    const { root } = this.elements;
    root.addEventListener('burger-status', (event) => {
      if (event instanceof CustomEvent) {
        const { isOpened } = event.detail;
        this.navVisibility(isOpened);
      }
    });
  }

  private changeHeaderViewAfterWindowResize(): void {
    const { burger } = this.components;
    window.addEventListener('resize', () => {
      if (this.isTabletView()) {
        if (burger.isOpened()) {
          burger.changeStatus();
        }
      }
      this.setHeaderConfig();
    });
  }

  private setHeaderConfig(): void {
    if (this.isTabletView()) {
      this.navVisibility(false);
    } else {
      this.navVisibility(true);
    }
  }

  private isTabletView(): boolean {
    const tabletViewSize = Number(
      getComputedStyle(document.documentElement).getPropertyValue('--tablet').slice(0, -2)
    );
    return window.innerWidth <= tabletViewSize;
  }
}
