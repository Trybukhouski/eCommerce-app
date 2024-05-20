import '@modules/application';
import '@config/config';
import { Router, Routes, PagesDataModifier, pagesData } from '@routes/index';
import { MainPageActions as MainPage } from '@modules/mainPage/mainPage.actions';
import { LocalStorageService } from '@services';
import './style.scss';

const isUserAuthorised = LocalStorageService.isUserAuthorised();

const pagesCollection = new PagesDataModifier(pagesData);
const router = new Router(pagesCollection);
pagesCollection.setBlockedPagesAccordingUserStatus(isUserAuthorised);

const mainPage = new MainPage(pagesCollection, router);
mainPage.create();

if (router.getHash() as Routes) {
  const route = router.getHash() as Routes;
  mainPage.inform(route);
  const { header } = mainPage.components;
  const { nav } = header.components;
  nav.inform(route);
}

const { nav } = mainPage.components.header.components;

router.addSubscriber(mainPage);
router.addSubscriber(nav);
router.observeHashChange();

document.body.append(mainPage.elements.root);
