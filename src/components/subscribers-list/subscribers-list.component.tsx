import { useSubscribers } from '../../hooks/use-subscribers';

export default function SubscribersList() {
  const { subscribers } = useSubscribers();

  return (
    <>
      {subscribers.map(sub => <p key={sub.id}>{sub.name}</p>)}
    </>
  );
}
