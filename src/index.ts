import './style.scss';
import '@modules/application';
import '@config/config';
import { Router } from '@routes/index';
import { MainPageView as MainPage } from '@modules/mainPage/index';

const mainPage = new MainPage();
mainPage.create();

const router = new Router();
router.addSubscriber(mainPage);

document.body.append(mainPage.elements.root);
mainPage.setContent('error');

router.observeHashChange();
