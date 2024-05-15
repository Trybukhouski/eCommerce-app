import { ErrorPageView as ErrorPage } from '@modules/errorPage/index';

export class MainPageMap {
  protected components = {
    errorPage: new ErrorPage().create(),
  };
}
