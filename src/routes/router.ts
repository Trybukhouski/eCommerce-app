import { Routes } from '@routes/pagesData/interfaces/routes';
import { RouterModel, Subscriber } from './interfaces';

export class Router implements RouterModel {
  private subscribers: Subscriber[] = [];

  private routes: Routes[];

  constructor(routes: Routes[]) {
    this.routes = routes;
  }

  public observeHashChange(): void {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      const outputHash: Routes = this.routes.includes(hash as Routes) ? (hash as Routes) : 'error';
      this.setHash(outputHash);
      this.subscribers.forEach((subscriber) => subscriber.inform(outputHash));
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
