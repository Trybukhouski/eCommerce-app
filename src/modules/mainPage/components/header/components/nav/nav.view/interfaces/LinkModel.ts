import { Routes } from '@routes/pagesData/interfaces/routes';

interface LinkModel {
  hash: Routes;
  name: string;
  current: boolean;
  type: 'shop' | 'account' | 'system';
}

export default LinkModel;
