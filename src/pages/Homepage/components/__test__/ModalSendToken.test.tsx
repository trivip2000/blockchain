import { render } from '@testing-library/react';
import ModalSendToken from '../ModalSendToken';
import { Modal } from 'antd';
import FormInput from '../FormInput';
import '@testing-library/jest-dom';
jest.mock('antd', () => {
  return {
    Modal: jest.fn(({ children, ...props }) => <div {...props}>{children}</div>),
  };
});
type DataType = {
  coinObjectCount: number;
  coinType: string;
  totalBalance: string;
  // add other properties as needed
};
jest.mock('./../FormInput', () => {
  return jest.fn(() => <div>FormInput</div>);
});

describe('ModalSendToken', () => {
  let open: boolean, setOpen: jest.Mock, data: DataType[];

  beforeEach(() => {
    jest.clearAllMocks();
    open = true;
    setOpen = jest.fn();
    data = [{ coinType: 'Sui', coinObjectCount: 1, totalBalance: '1' }];
  });

  it('should render without crashing', () => {
    render(<ModalSendToken open={open} setOpen={setOpen} />);
  });

  it('should open the modal when open prop is true', () => {
    render(<ModalSendToken open={open} setOpen={setOpen} />);
    expect(Modal).toHaveBeenCalledWith(expect.objectContaining({ open: true }), expect.anything());
  });

  it('should render FormInput with correct props', () => {
    render(<ModalSendToken open={open} setOpen={setOpen} />);
    expect(FormInput).toHaveBeenCalledWith(
      { data, handleCancel: expect.any(Function) },
      expect.anything(),
    );
  });
});
