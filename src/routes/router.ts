import { Routes, PagesDataModifierModel } from '@routes';
import { RouterModel, Subscriber } from './interfaces';

export class Router implements RouterModel {
  private subscribers: Subscriber[] = [];

  private pagesDataModifier: PagesDataModifierModel;

  constructor(PagesDataModifier: PagesDataModifierModel) {
    this.pagesDataModifier = PagesDataModifier;
  }

  public observeHashChange(): void {
    const paramsObj: Record<string, string> = {};
    window.addEventListener('hashchange', () => {
      const [hash, params] = window.location.hash.slice(1).split('?');
      if (params) {
        params.split('&').forEach((param) => {
          const [key, value] = param.split('=');
          if (typeof key === 'string' && typeof value === 'string') {
            paramsObj[key] = value;
          }
        });
      }
      const hashAfterAvailablePagesCheck: Routes = this.pagesDataModifier
        .getPagesHash()
        .includes(hash as Routes)
        ? (hash as Routes)
        : 'error';
      this.pagesDataModifier.setCurrentPage(hashAfterAvailablePagesCheck);
      const hashAfterRedirectionCheck = this.pagesDataModifier.getHashOfCurrentPage();
      if (params) {
        this.setHash(hashAfterRedirectionCheck, paramsObj);
      } else {
        this.setHash(hashAfterRedirectionCheck);
      }
      this.subscribers.forEach((subscriber) => subscriber.inform(hashAfterRedirectionCheck));
    });
  }

  public setHash(hash: string, params?: Record<string, string>): void {
    let paramString = '';
    if (params) {
      const urlParams = new URLSearchParams(params);
      paramString = `?${urlParams.toString()}`;
    }
    window.location.hash = `${hash}${paramString}`;
  }

  public getHash(): string | undefined {
    const [hash] = window.location.hash.slice(1).split('?');
    return hash;
  }

  public getHashParams(): string | undefined {
    return window.location.hash.slice(1).split('?')[1];
  }

  public addSubscriber(subscriber: Subscriber) {
    this.subscribers.push(subscriber);
  }
}
