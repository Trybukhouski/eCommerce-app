import '@modules/application';
import '@config/config';
import { Router } from '@routes/index';
import { MainPageView as MainPage } from '@modules/mainPage/index';
import Header from './modules/mainPage/components/header/HeaderActions';
import { PagesDataModifier } from './routes/pagesData/pagesData.modifier';
import { pagesData } from './routes/pagesData/pagesData';

import './style.scss';
const mainPage = new MainPage();
mainPage.create();

const router = new Router();
router.addSubscriber(mainPage);
router.observeHashChange();

const pagesCollection = new PagesDataModifier(pagesData);
pagesCollection.setBlockedPagesAccordingUserStatus(false);

const header = new Header(pagesCollection);
header.create();

document.body.append(header.elements.root);
