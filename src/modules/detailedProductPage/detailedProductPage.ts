import { DetailedProductPageUI } from './ui';

export class DetailedProductPage {
  public elem: HTMLElement;
  private uiApi: DetailedProductPageUI;

  constructor() {
    this.uiApi = new DetailedProductPageUI();
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
