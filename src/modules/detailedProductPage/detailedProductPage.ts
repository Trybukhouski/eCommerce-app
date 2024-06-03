/* eslint-disable no-useless-escape */
import { ProductService } from '@services';
import mainImagePath from '@assets/images/main-image.jpg';
import { DetailedProductPageUI } from './ui';

export class DetailedProductPage {
  public elem: HTMLElement;

  private uiApi: DetailedProductPageUI;

  constructor() {
    this.uiApi = new DetailedProductPageUI();
    this.elem = this.uiApi.elem;

    this.addProductIDsListener();
  }

  private async addProductIDsListener() {
    window.addEventListener('hashchange', () => {
      setTimeout(() => {}, 0);
      const idMatch = window.location.hash.match(/(?<=id\=).*/);
      if (idMatch === null) {
        return;
      }
      const id = idMatch[0];
      this.loadProductImages(id);
    });
  }

  public async loadProductImages(productId: string): Promise<void> {
    const ui = this.uiApi;
    try {
      const images = await ProductService.getProductImagesById(productId);
      console.log('Loaded images:', images);
      if (images.length === 0) {
        console.log('No images found for product:', productId);
        images.push(mainImagePath);
      }
      ui.imagePaths = images;
      ui.updateSlider(images);
      ui.mainImage.src = images[0] || mainImagePath;
    } catch (error) {
      console.error('Failed to load product images:', error);
      ui.updateSlider([mainImagePath]);
    }
  }
}
