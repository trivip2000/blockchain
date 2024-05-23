import { render, screen } from '@testing-library/react';
import BalanceCard from '../BalanceCard';
// import { getEclipseAddress, getBlance } from '@/constants';
import '@testing-library/jest-dom';
jest.mock('@/constants', () => ({
  getEclipseAddress: jest.fn((address) => address),
  getBlance: jest.fn((amount) => amount),
}));
jest.mock('./../SuiIcon', () => {
  return jest.fn(() => <div>SuiIcon</div>);
});

describe('BalanceCard', () => {
  const balance = {
    amount: '1000',
    owner: { AddressOwner: '0x1234567890abcdef' },
  };

  it('should render without crashing', () => {
    render(<BalanceCard balance={balance} />);
    expect(screen.getByText('Balance Changes')).toBeInTheDocument();
  });

  it('should display the correct balance amount', () => {
    render(<BalanceCard balance={balance} />);
    expect(screen.getByText(balance.amount)).toBeInTheDocument();
  });

  it('should display the correct owner address', () => {
    render(<BalanceCard balance={balance} />);
    expect(screen.getByText(balance.owner.AddressOwner)).toBeInTheDocument();
  });
});
