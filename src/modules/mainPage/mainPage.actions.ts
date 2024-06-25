import { MainPageView } from './mainPage.view';

export class MainPageActions extends MainPageView {
  public create(): MainPageView {
    super.create();
    this.updateHashAccordingClickInNavLink();
    this.updateParamsOfCatalogURL();
    this.updateCartWidget();
    return this;
  }

  private updateCartWidget(): void {
    document.addEventListener('changeCardsInBasket', (event) => {
      const { header } = this.components;
      const { nav } = header.components;
      const { cartWidget } = nav.components;

      if (event instanceof CustomEvent) {
        cartWidget.updateTotalItemsInCart(event.detail as number);
      }
    });
  }

  private updateHashAccordingClickInNavLink(): void {
    this.elements.root.addEventListener('clickOnNav', (event) => {
      if (event instanceof CustomEvent) {
        if (event.detail.redirection === 'signOut') {
          this.elements.root.dispatchEvent(
            new CustomEvent('logined', {
              bubbles: true,
              detail: {
                logined: false,
              },
            })
          );
        } else {
          const incomingHash = event.detail.redirection;
          this.services.router.setHash(`${incomingHash}`);
        }
      }
    });
  }

  private updateParamsOfCatalogURL(): void {
    this.elements.root.addEventListener('clickOnCard', (event) => {
      if (event instanceof CustomEvent) {
        if (event.detail.target && (event.detail.target as HTMLElement).closest('button')) {
          return;
        }
        const { router } = this.services;
        router.setHash('card', { id: event.detail.id });
      }
    });
  }
}
