import { Subscriber } from './subscriber';

export interface RouterModel {
  observeHashChange(): void;
  setHash(hash: string, params?: Record<string, string>): void;
  getHashParams(): string | undefined;
  addSubscriber(subscriber: Subscriber): void;
}
