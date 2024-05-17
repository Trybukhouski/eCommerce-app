export interface PageModel {
  name: string;
  hash: string;
  status: 'available' | 'blocked';
  current: boolean;
  type: 'shop' | 'account' | 'system';
  ifBlocked?: {
    redirectionPage: string;
  };
}
