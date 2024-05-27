import { Routes } from './routes';

export interface LinkModel {
  hash: Routes;
  name: string;
  current: boolean;
  type: 'shop' | 'account' | 'system';
}
