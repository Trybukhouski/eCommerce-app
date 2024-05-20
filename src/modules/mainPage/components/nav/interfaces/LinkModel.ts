import { Routes } from '@routes/pagesData/interfaces/routes';

export interface LinkModel {
  hash: Routes;
  name: string;
  current: boolean;
  type: 'shop' | 'account' | 'system';
}
