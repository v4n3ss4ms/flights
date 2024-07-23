import { type FC, ReactNode, useEffect, useState } from 'react';
import { SubscribersContext } from './subscribers.context';
import { Subscriber } from '../domain/subscriber.ts';
import { GetSubscribersQry } from '../application/get-subscribers.qry.ts';


interface Props {
  children: ReactNode;
}

export const SubscribersProvider: FC<Props> = ({ children }) => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const qry = new GetSubscribersQry();
        const data = await qry.execute();
        setSubscribers(data);
      } catch (error) {
        console.error('Error fetching subscribers:', error);
      }
    };

    fetchSubscribers();
  }, []);

  const getSubscriberById = (id: string): Subscriber | undefined => {
    return subscribers.find(sub => sub.id === id); // TODO: this query should be handled by a use case, and the use case should implement a new endpoint fetch
  };


  const updateSubscriberQuota = (subscriber: Subscriber) => {
    const updatedListSubscribers = subscribers.map(sub => {
      if (sub.id === subscriber.id) {
        sub.quota = subscriber.quota;
      }

      return sub;
    });

    setSubscribers(updatedListSubscribers);
  };

  return (
    <SubscribersContext.Provider
      value={{
        subscribers,
        getSubscriberById,
        updateSubscriberQuota,
      }}
    >
      {children}
    </SubscribersContext.Provider>
  );
};
