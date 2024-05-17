import { Subscriber } from '.';

export interface RouterModel {
  observeHashChange(): void;
  setHash(hash: string): void;
  addSubscriber(subscriber: Subscriber): void;
}
