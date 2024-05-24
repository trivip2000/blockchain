import React from 'react';
import { Modal } from 'antd';
import FormInput from './FormInput';
import { ModalSendTokenProps } from './../types';
import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';
const ModalSendToken: React.FC<ModalSendTokenProps> = ({ open, setOpen, refetch }) => {
  const handleCancel = () => {
    setOpen(false);
  };
  const account = useCurrentAccount();
  const { data, isPending, error } = useSuiClientQuery(
    'getAllBalances',
    {
      owner: account?.address as string,
    },
    {
      enabled: !!account,
    },
  );

  if (!account) {
    return;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isPending || !data) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Modal title={`Send Coin`} open={open} onCancel={handleCancel} footer={null}>
        <FormInput refetch={refetch} data={data} handleCancel={handleCancel} />
      </Modal>
    </>
  );
};

export default ModalSendToken;
