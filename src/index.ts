import '@modules/application';
import '@config/config';
import { Router } from '@routes/index';
import { MainPageActions as MainPage } from '@modules/mainPage/mainPage.actions';
import { PagesDataModifier } from './routes/pagesData/pagesData.modifier';
import { pagesData } from './routes/pagesData/pagesData';
import './style.scss';

const pagesCollection = new PagesDataModifier(pagesData);
const router = new Router(pagesCollection.getPagesHash());
pagesCollection.setBlockedPagesAccordingUserStatus(false);

const mainPage = new MainPage(pagesCollection, router);
mainPage.create();

const { nav } = mainPage.components.header.components;

router.addSubscriber(mainPage);
router.addSubscriber(nav);
router.observeHashChange();

document.body.append(mainPage.elements.root);
