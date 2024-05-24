// @ts-nocheck
import { render, screen } from '@testing-library/react';
import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';
// import moment from 'moment';
// import { Collapse, Card } from 'antd';
// import { BalanceChangesProps, ObjectCardProps } from './../types';
// import ObjectCard from '@/components/ObjectCard';
// import BalanceCard from '@/components/BalanceCard';
// import { getBlance } from '@/constants';
// import { TransactionBlock } from '../styled';
import ReceiveTransactions from '../ReceiveTransactions';
import '@testing-library/jest-dom';
jest.mock('@mysten/dapp-kit', () => ({
  useCurrentAccount: jest.fn(),
  useSuiClientQuery: jest.fn(),
}));

jest.mock('moment', () =>
  jest.fn(() => ({
    format: jest.fn(),
  })),
);

jest.mock('antd', () => ({
  Collapse: jest.fn(({ items }) => <div>{items}</div>),
  Card: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock('@/components/ObjectCard', () => jest.fn(({ object }) => <div>{object}</div>));
jest.mock('@/components/BalanceCard', () => jest.fn(({ balance }) => <div>{balance}</div>));
jest.mock('@/constants', () => ({
  getBlance: jest.fn(),
}));

describe('ReceiveTransactions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state when account is not available', () => {
    (useCurrentAccount as jest.Mock).mockReturnValue({ address: 'testAddress' });
    (useSuiClientQuery as jest.Mock).mockReturnValue({ data: null, isPending: true, error: null });
    render(<ReceiveTransactions />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render error message when there is an error', () => {
    const errorMessage = 'Error: Something went wrong';
    (useCurrentAccount as jest.Mock).mockReturnValue({ address: 'testAddress' });
    (useSuiClientQuery as jest.Mock).mockReturnValue({
      data: null,
      isPending: false,
      error: new Error(errorMessage),
    });
    render(<ReceiveTransactions />);

    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });
});
