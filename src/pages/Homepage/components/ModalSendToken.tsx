import React from 'react';
import { Modal } from 'antd';
import FormInput from './FormInput';
import { ModalSendTokenProps } from './../types';

const ModalSendToken: React.FC<ModalSendTokenProps> = ({ open, setOpen, data }) => {
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal title={`Send Coin`} open={open} onCancel={handleCancel} footer={null}>
        <FormInput data={data} handleCancel={handleCancel} />
      </Modal>
    </>
  );
};

export default ModalSendToken;
