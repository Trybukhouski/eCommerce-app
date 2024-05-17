import { Routes } from '../pagesData/interfaces/routes';

export interface Subscriber {
  inform: (page: Routes) => void;
}
