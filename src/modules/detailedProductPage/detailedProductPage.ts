import { DetailedProductPageUI } from './ui';

export class DetailedProductPage {
  public elem: HTMLElement;

  private uiApi: DetailedProductPageUI;

  constructor() {
    console.log('DetailedProductPage constructor called');
    this.uiApi = new DetailedProductPageUI();
    this.elem = this.uiApi.elem;
    this.render();
  }

  public render() {
    console.log('DetailedProductPage render called');
    const app = document.getElementById('app');

    if (app) {
      console.log('Element with id "app" found');
      app.innerHTML = '';
      app.appendChild(this.uiApi.elem);
      console.log('DetailedProductPage content appended to app');
    } else {
      console.error('Element with id "app" not found');
    }
  }
}
