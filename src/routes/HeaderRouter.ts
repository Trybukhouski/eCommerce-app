import pages from 'interfaces/pages';

interface subscriber {
  inform: (page: pages) => void;
}

class HeaderRouter {
  private routes: Set<pages> = new Set(['page1', 'page2', 'page3', 'error']);

  private subscribers: subscriber[] = [];

  public observeHashChange(): void {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1) as pages;
      const result = this.routes.has(hash) ? hash : 'error';
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

export default HeaderRouter;
