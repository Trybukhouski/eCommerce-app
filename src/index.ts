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
mainPage.elements.root.addEventListener('logined', (event) => {
  if (event instanceof CustomEvent) {
    if (!event.detail.logined) {
      LocalStorageService.clearAuthorisedToken();
      router.setHash('main');
    }
    pagesCollection.setBlockedPagesAccordingUserStatus(event.detail.logined);
    const { header } = mainPage.components;
    const { nav } = header.components;
    nav.createLinks(pagesCollection.getAvailableLinks());
  }
});

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
