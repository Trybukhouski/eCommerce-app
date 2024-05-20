import { Routes } from '@routes/pagesData/interfaces/routes';

export interface Subscriber {
  inform: (page: Routes) => void;
}
