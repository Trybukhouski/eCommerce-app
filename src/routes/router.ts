import { Routes } from '@interfaces/index';

interface subscriber {
  inform: (page: Routes) => void;
}

export class Router {
  private routes: Set<Routes> = new Set(['page1', 'page2', 'page3', 'error']);

  private subscribers: subscriber[] = [];

  public observeHashChange(): void {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      const result = this.routes.has(hash as Routes) ? (hash as Routes) : 'error';
      this.subscribers.forEach((subscriber) => subscriber.inform(result));
    });
  }

  public setHash(hash: string): void {
    window.location.hash = `#${hash}`;
  }

  public addSubscriber(subscriber: subscriber) {
    this.subscribers.push(subscriber);
  }
}
