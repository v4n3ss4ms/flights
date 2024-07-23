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
    return subscribers.find(sub => sub.id === id); // TODO: this query should be handled by a new API call (new use case should implement a new endpoint get)
  };


  const updateSubscriberQuota = (id: string, quota: number) => {
    // TODO: this command should be handled by a new API call (new use case should implement a new endpoint post)
    let hanBeenChanged = false; // TODO: this is just for emulating a kind of error
    const updatedListSubscribers = subscribers.map(sub => {
      if (sub.id === id) {
        sub.quota = quota;
        hanBeenChanged = true;
      }

      return sub;
    });

    if (hanBeenChanged) {
      setSubscribers(updatedListSubscribers);
    } else {
      throw new Error('The subscriber has not been found')
    }
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
