import './App.css';
import { SubscribersProvider } from './providers/subscribers.provider.tsx';
import SubscribersList from './components/subscribers-list/subscribers-list.component.tsx';

export default function App() {

  return (
    <SubscribersProvider>
      <SubscribersList />

    </SubscribersProvider>
  );
}

