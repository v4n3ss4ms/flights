import { render, screen } from '@testing-library/react';
import SubscribersList from './subscribers-list.component';

jest.mock('../../hooks/use-subscribers', () => ({
  useSubscribers: jest.fn().mockReturnValue({
    subscribers: [
      { id: '1', name: 'A_NAME', quota: 1 },
      { id: '2', name: 'ANOTHER_NAME', quota: 2 },
    ],
    getSubscriberById: jest.fn(),
    updateSubscriberQuota: jest.fn(),
  })
}));

describe('SubscribersList Component', () => {
  it('should render table with subscriber data', () => {
    render(<SubscribersList />);

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Quota')).toBeInTheDocument();
    expect(screen.getByText('A_NAME')).toBeInTheDocument();
    expect(screen.getByText('ANOTHER_NAME')).toBeInTheDocument();
  });
});
