import { createContext } from 'react';
import { Subscriber } from '../domain/subscriber.ts';

interface Subscribers {
  subscribers: Subscriber[];
  updateSubscriberQuota: (subscriber: Subscriber) => void;
}

export const SubscribersContext = createContext<Subscribers>({
  subscribers: [],
  updateSubscriberQuota: (subscriber: Subscriber) => {
  },
});
