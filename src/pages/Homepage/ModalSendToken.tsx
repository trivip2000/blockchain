import React from 'react';
import { Modal } from 'antd';
import FormInput from './FormInput';

type DataType = {
  coinObjectCount: number;
  coinType: string;
  totalBalance: string;
  // add other properties as needed
};

type ModalSendTokenProps = {
  setOpen: (open: boolean) => void;
  open: boolean;
  data: DataType[];
};

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
