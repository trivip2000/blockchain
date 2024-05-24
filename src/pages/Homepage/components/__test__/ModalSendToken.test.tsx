import { render } from '@testing-library/react';
import ModalSendToken from '../ModalSendToken';

import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';
import '@testing-library/jest-dom';
jest.mock('antd', () => {
  return {
    Modal: jest.fn(({ children, ...props }) => <div {...props}>{children}</div>),
  };
});
jest.mock('@mysten/dapp-kit', () => ({
  useCurrentAccount: jest.fn(),
  useSuiClientQuery: jest.fn(),
}));

jest.mock('./../FormInput', () => {
  return jest.fn(() => <div>FormInput</div>);
});

describe('ModalSendToken', () => {
  let open: boolean, setOpen: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    open = true;
    setOpen = jest.fn();
  });

  it('should render without crashing', () => {
    (useCurrentAccount as jest.Mock).mockReturnValue({ address: 'testAddress' });
    (useSuiClientQuery as jest.Mock).mockReturnValue({ data: [], isPending: false, error: null });
    render(<ModalSendToken open={open} setOpen={setOpen} />);
  });

  it('should open the modal when open prop is true', () => {
    (useCurrentAccount as jest.Mock).mockReturnValue({ address: 'testAddress' });
    (useSuiClientQuery as jest.Mock).mockReturnValue({ data: null, isPending: true, error: null });
    const { getByText } = render(<ModalSendToken open={open} setOpen={setOpen} />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });
});
