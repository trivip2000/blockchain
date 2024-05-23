import { render, fireEvent, waitFor } from '@testing-library/react';
import ListTokens from '../ListTokens';
import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';
import ModalSendToken from '../../pages/Homepage/components/ModalSendToken';
import '@testing-library/jest-dom';
jest.mock('@mysten/dapp-kit', () => ({
  useCurrentAccount: jest.fn(),
  useSuiClientQuery: jest.fn(),
}));

jest.mock('../../pages/Homepage/components/ModalSendToken', () => {
  return jest.fn(() => <div>ModalSendToken</div>);
});
jest.mock('./../SuiIcon', () => {
  return jest.fn(() => <div>SuiIcon</div>);
});

describe('ListTokens', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    (useCurrentAccount as jest.Mock).mockReturnValue({ address: 'testAddress' });
    (useSuiClientQuery as jest.Mock).mockReturnValue({ data: [], isPending: false, error: null });
    render(<ListTokens />);
  });

  it('shows loading state when data is pending', () => {
    (useCurrentAccount as jest.Mock).mockReturnValue({ address: 'testAddress' });
    (useSuiClientQuery as jest.Mock).mockReturnValue({ data: null, isPending: true, error: null });
    const { getByText } = render(<ListTokens />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error message when there is an error', () => {
    (useCurrentAccount as jest.Mock).mockReturnValue({ address: 'testAddress' });
    (useSuiClientQuery as jest.Mock).mockReturnValue({
      data: null,
      isPending: false,
      error: { message: 'Test error' },
    });
    const { getByText } = render(<ListTokens />);
    expect(getByText('Error: Test error')).toBeInTheDocument();
  });

  it('shows "No tokens" when data is empty', () => {
    (useCurrentAccount as jest.Mock).mockReturnValue({ address: 'testAddress' });
    (useSuiClientQuery as jest.Mock).mockReturnValue({ data: [], isPending: false, error: null });
    const { getByText } = render(<ListTokens />);
    expect(getByText('No tokens')).toBeInTheDocument();
  });

  it('correctly renders the list of tokens when data is available', () => {
    (useCurrentAccount as jest.Mock).mockReturnValue({ address: 'testAddress' });
    (useSuiClientQuery as jest.Mock).mockReturnValue({
      data: [{ coinType: '0x2::sui::SUI', coinObjectCount: 1, totalBalance: '1' }],
      isPending: false,
      error: null,
    });
    const { getByText } = render(<ListTokens />);
    expect(getByText('SUI')).toBeInTheDocument();
  });

  it('opens the ModalSendToken when a token is clicked', async () => {
    (useCurrentAccount as jest.Mock).mockReturnValue({ address: 'testAddress' });
    (useSuiClientQuery as jest.Mock).mockReturnValue({
      data: [{ coinType: '0x2::sui::SUI', coinObjectCount: 1, totalBalance: '1' }],
      isPending: false,
      error: null,
    });
    const { getByText } = render(<ListTokens />);
    fireEvent.click(getByText('SUI'));
    await waitFor(() => expect(ModalSendToken).toHaveBeenCalled());
  });
});
