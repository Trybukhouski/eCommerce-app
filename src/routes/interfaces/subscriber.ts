import { Routes } from '@routes';

export interface Subscriber {
  inform: (page: Routes) => void;
}
