import { createContext } from 'react';
import { Subscriber } from '../domain/subscriber.ts';

export interface Subscribers {
  subscribers: Subscriber[];
  getSubscriberById: (id: string) => void;
  updateSubscriberQuota: (id: string, quota: number) => void;
}

export const SubscribersContext = createContext<Subscribers>({
  subscribers: [],
  getSubscriberById: (id: string) => {},
  updateSubscriberQuota: (id: string, quota: number) => {},
});
