import { Routes } from '@routes';
import { ProductService } from '@services';
import { getDetailForProductCard } from '@root/services/productService/utils/getDetailForProductCard';
import { MainPageMap } from './MainPage.map';
import * as styles from './styles.module.scss';
import { PagesElements } from './interfaces';

export class MainPageView extends MainPageMap {
  public elements: PagesElements = {
    header: this.components.header.elements.root,
    mainContent: document.createElement('section'),
    root: document.createElement('main'),
  };

  public addPagesContent(pairs: [keyof PagesElements, HTMLElement][]): void {
    pairs.forEach(([key, value]) => {
      this.elements[key] = value;
    });
  }

  public create(): MainPageView {
    const { header, mainContent, root } = this.elements;
    header.classList.add(styles.header);
    root.append(header);
    root.append(mainContent);

    return this;
  }

  public async setContent(content: Routes): Promise<void> {
    const { mainContent } = this.elements;
    mainContent.childNodes.forEach((child) => child.remove());

    const key = `${content}Page`;
    const pageElement = this.elements[key as keyof PagesElements];
    if (pageElement) {
      mainContent.append(pageElement);
    } else {
      const page = document.createElement('div');
      page.innerHTML = content;
      mainContent.append(page);
    }

    // RENDER DETAILED PRODUCT CARD
    if (content === 'card') {
      const cardID = this.services.router.getHashParams()?.split('=')[1];
      if (cardID) {
        const productData = await ProductService.getProductById(cardID);
        const productDetail = getDetailForProductCard(productData);
        const title = this.elements.cardPage?.querySelector('.title');
        if (title) {
          title.innerHTML = productDetail.titleText;
        }
        const description = this.elements.cardPage?.querySelector('.description');
        if (description) {
          description.innerHTML = productDetail.descriptionText;
        }
        const mainImage = this.elements.cardPage?.querySelector('.main-image') as HTMLImageElement;
        if (mainImage) {
          mainImage.src = productDetail.urls.mainImage;
        }
      }
    }
  }

  public inform(page: Routes): void {
    this.setContent(page);
  }
}
