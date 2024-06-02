import { Routes } from './routes';

export interface PageModel {
  name: string;
  hash: Routes;
  status: 'available' | 'blocked';
  current: boolean;
  type: 'shop' | 'account' | 'system';
  ifBlocked: {
    redirectionPage: Routes;
  };
}
