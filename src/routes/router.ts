import { Routes, PagesDataModifierModel } from '@routes';
import { RouterModel, Subscriber } from './interfaces';

export class Router implements RouterModel {
  private subscribers: Subscriber[] = [];

  private pagesDataModifier: PagesDataModifierModel;

  constructor(PagesDataModifier: PagesDataModifierModel) {
    this.pagesDataModifier = PagesDataModifier;
  }

  public observeHashChange(): void {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      const hashAfterAvailablePagesCheck: Routes = this.pagesDataModifier
        .getPagesHash()
        .includes(hash as Routes)
        ? (hash as Routes)
        : 'error';
      this.pagesDataModifier.setCurrentPage(hashAfterAvailablePagesCheck);
      const hashAfterRedirectionCheck = this.pagesDataModifier.getHashOfCurrentPage();
      this.setHash(hashAfterRedirectionCheck);
      this.subscribers.forEach((subscriber) => subscriber.inform(hashAfterRedirectionCheck));
    });
  }

  public setHash(hash: Routes): void {
    window.location.hash = `#${hash}`;
  }

  public getHash(): string {
    return window.location.hash.slice(1);
  }

  public addSubscriber(subscriber: Subscriber) {
    this.subscribers.push(subscriber);
  }
}
