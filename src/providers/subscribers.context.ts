import { createContext } from 'react';
import { Subscriber } from '../domain/subscriber.ts';

interface Subscribers {
  subscribers: Subscriber[];
  getSubscriberById: (id: string) => void;
  updateSubscriberQuota: (subscriber: Subscriber) => void;
}

export const SubscribersContext = createContext<Subscribers>({
  subscribers: [],
  getSubscriberById: (id: string) => {},
  updateSubscriberQuota: (subscriber: Subscriber) => {},
});
