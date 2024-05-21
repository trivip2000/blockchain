import React from 'react';
import { Modal } from 'antd';
import FormInput from './FormInput';
type ModalSendTokenProps = {
  setOpen: (open: boolean) => void;
  open: boolean;
};
const ModalSendToken: React.FC<ModalSendTokenProps> = ({ open, setOpen }) => {
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal title="Send Coin" open={open} onCancel={handleCancel} footer={null}>
        <FormInput />
      </Modal>
    </>
  );
};

export default ModalSendToken;
