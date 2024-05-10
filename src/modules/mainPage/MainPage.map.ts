import ErrorPage from '../errorPage/errorPage.view/ErrorPage.view';

class MainPageMap {
  protected components = {
    errorPage: new ErrorPage().create(),
  };
}

export default MainPageMap;
