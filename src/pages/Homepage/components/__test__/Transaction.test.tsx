import { render, screen } from '@testing-library/react';
import Transaction from '../Transaction';
// import SendTransactions from './SendTransactions';
// import ReceiveTransactions from './ReceiveTransactions';
// import { Card } from 'antd';
import '@testing-library/jest-dom';
jest.mock('antd', () => ({
  Card: jest.fn(({ children }) => <div>Your Activity {children}</div>),
}));

jest.mock('./../SendTransactions', () => jest.fn(() => <div>SendTransactions</div>));
jest.mock('./../ReceiveTransactions', () => jest.fn(() => <div>ReceiveTransactions</div>));

describe('Transaction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<Transaction />);
    expect(screen.getByText('Your Activity')).toBeInTheDocument();
  });

  it('should contain SendTransactions component', () => {
    render(<Transaction />);
    expect(screen.getByText('SendTransactions')).toBeInTheDocument();
  });

  it('should contain ReceiveTransactions component', () => {
    render(<Transaction />);
    expect(screen.getByText('ReceiveTransactions')).toBeInTheDocument();
  });
});
