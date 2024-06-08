class CartPageUI {
  public root: HTMLElement;

  constructor() {
    this.root = document.createElement('section');
  }

  public hideContent(): void {}

  public showEmptyMessage(): void {
    this.root.textContent = 'Пусто';
  }

  public showBasket(): void {
    this.root.textContent = 'Полно';
  }
}

export { CartPageUI };
