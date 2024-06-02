import { Subscriber } from './subscriber';

export interface RouterModel {
  observeHashChange(): void;
  setHash(hash: string, params?: Record<string, string>): void;
  addSubscriber(subscriber: Subscriber): void;
}
