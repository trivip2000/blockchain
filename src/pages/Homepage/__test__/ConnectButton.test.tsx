/* eslint-disable react/display-name */
// File: ConnectButton.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ConnectButton from '../components/ConnectButton';
import { useCurrentAccount, useDisconnectWallet } from '@mysten/dapp-kit';
// import { mocked } from 'ts-jest/utils';
jest.mock('./../ListTokens', () => () => {
  return <div />;
});
jest.mock('@mysten/dapp-kit');

describe('ConnectButton', () => {
  it('should render connect button when no account', () => {
    const mockDisconnect = jest.fn();
    (useCurrentAccount as jest.Mock).mockReturnValue(null);
    (useDisconnectWallet as jest.Mock).mockReturnValue({ mutate: mockDisconnect });
    render(<ConnectButton />);

    expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
  });

  it('should render address when account is present', () => {
    const mockAccount = { address: '0x1234567890abcdef' };
    (useCurrentAccount as jest.Mock).mockReturnValue(mockAccount);

    render(<ConnectButton />);

    expect(screen.getByText('0x123...bcdef')).toBeInTheDocument();
  });

  it('should call disconnect when logout button is clicked', () => {
    const mockAccount = { address: '0x1234567890abcdef' };
    const mockDisconnect = jest.fn();
    (useCurrentAccount as jest.Mock).mockReturnValue(mockAccount);
    (useDisconnectWallet as jest.Mock).mockReturnValue({ mutate: mockDisconnect });
    render(<ConnectButton />);
    fireEvent.click(screen.getByTitle('Logout'));

    expect(mockDisconnect).toHaveBeenCalled();
  });
});
