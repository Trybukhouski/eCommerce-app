import { ErrorPageView as ErrorPage } from '@modules/errorPage';

export class MainPageMap {
  protected components = {
    errorPage: new ErrorPage().create(),
  };
}
