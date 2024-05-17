import Header from './modules/mainPage/components/header/HeaderActions';
import { PagesDataModifier } from './routes/pagesData/pagesData.modifier';
import { pagesData } from './routes/pagesData/pagesData';

import './style.scss';

export const pagesCollection = new PagesDataModifier(pagesData);
pagesCollection.setBlockedPagesAccordingUserStatus(false);

const header = new Header(pagesCollection);
header.create();

document.body.append(header.elements.root);
