import { DetailedProductPageUI } from './ui';

export class DetailedProductPage {
  public elem: HTMLElement;

  private uiApi: DetailedProductPageUI;

  constructor(productId: string) {
    this.uiApi = new DetailedProductPageUI(productId);
    this.elem = this.uiApi.elem;
    this.render();
  }

  public render() {
    const app = document.getElementById('app');

    if (app) {
      app.innerHTML = '';
      app.appendChild(this.uiApi.elem);
    } else {
      console.error('Element with id "app" not found');
    }
  }
}
