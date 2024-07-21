import { useContext } from 'react';
import { SubscribersContext } from '../providers/subscribers.context';

export const useSubscribers = () => {
  return useContext(SubscribersContext);
};
