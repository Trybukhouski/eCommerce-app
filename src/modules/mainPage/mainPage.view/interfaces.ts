type Pages =
  | 'errorPage'
  | 'registrationPage'
  | 'loginPage'
  | 'profilePage'
  | 'catalogPage'
  | 'aboutPage';

type PagesElements = Partial<Record<Pages, HTMLElement>>;
interface PagesElementsAndRoot extends PagesElements {
  header: HTMLElement;
  mainContent: HTMLElement;
  root: HTMLElement;
}

export { PagesElementsAndRoot as PagesElements };
