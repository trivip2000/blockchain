import { render, screen } from '@testing-library/react';
import SendTransactions from '../SendTransactions';
import '@testing-library/jest-dom';
jest.mock('@/components/ObjectCard', () => jest.fn(({ object }) => <div>{object}</div>));
jest.mock('@/components/BalanceCard', () => jest.fn(({ balance }) => <div>{balance}</div>));
jest.mock('@/constants', () => ({
  getBlance: jest.fn(),
}));

describe('SendTransactions', () => {
  it('should render the transactions correctly', () => {
    const mockData = [
      {
        timestampMs: '1631234567890',
        balanceChanges: [
          { amount: '100', currency: 'USD' },
          { amount: '200', currency: 'EUR' },
        ],
        objectChanges: [
          { objectId: '1', name: 'Object 1' },
          { objectId: '2', name: 'Object 2' },
        ],
        transaction: {
          data: {
            gasData: {
              price: '10',
            },
          },
        },
      },
    ];

    render(<SendTransactions data={mockData} />);

    expect(screen.getByText('Transaction')).toBeInTheDocument();
  });
});
