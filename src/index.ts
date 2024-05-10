import './style.scss';
import HeaderRouter from './routes/HeaderRouter';
import MainPage from './modules/mainPage/mainPage.view/MainPageView';

const mainPage = new MainPage();
mainPage.create();

const headerRouter = new HeaderRouter();
headerRouter.addSubscriber(mainPage);

document.body.append(mainPage.elements.root as HTMLElement);
mainPage.setContent('error');

headerRouter.observeHashChange();
