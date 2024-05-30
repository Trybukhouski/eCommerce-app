import { Pages } from '@routes';

type PagesElements = Partial<Record<Pages, HTMLElement>>;
interface PagesElementsAndRoot extends PagesElements {
  header: HTMLElement;
  mainContent: HTMLElement;
  root: HTMLElement;
  detailedProductPage?: HTMLElement;
}

export { PagesElementsAndRoot as PagesElements };
