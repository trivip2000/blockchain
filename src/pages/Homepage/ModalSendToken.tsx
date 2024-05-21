import React from 'react';
import { Modal } from 'antd';
import FormInput from './FormInput';
import useStore from '@/stores/createCounterSlice';
type ModalSendTokenProps = {
  setOpen: (open: boolean) => void;
  open: boolean;
};
const ModalSendToken: React.FC<ModalSendTokenProps> = ({ open, setOpen }) => {
  const coinSelected = useStore((state) => state.coinSelected);
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal title={`Send Coin ${coinSelected}`} open={open} onCancel={handleCancel} footer={null}>
        <FormInput />
      </Modal>
    </>
  );
};

export default ModalSendToken;
