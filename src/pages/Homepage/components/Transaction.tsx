// @ts-nocheck
import React, { useState } from 'react';
import { Card } from 'antd';
import { TransactionStyled } from '../styled';
import ReceiveTransactions from './ReceiveTransactions';
import SendTransactions from './SendTransactions';
import { Button } from 'antd';
import ModalSendToken from './ModalSendToken';
import { useTransaction } from '@/hooks';

const Transaction: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { dataFrom, dataTo, account, isError, isPending, refetch } = useTransaction();

  if (!account) {
    return;
  }

  if (isError) {
    return <div>Error: {isError.message}</div>;
  }

  if (isPending || !dataFrom || !dataTo) {
    return <div>Loading...</div>;
  }
  return (
    <TransactionStyled>
      <Card
        title={
          <div className="flex justify-between items-center">
            Your Activity{' '}
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                // refetch();
              }}
            >
              Send Coins
            </Button>
          </div>
        }
        bordered={false}
        className="w-[300px] sm:w-[520px]"
      >
        <SendTransactions data={dataFrom.data} />
        <ReceiveTransactions data={dataFrom.data} />
      </Card>
      <ModalSendToken refetch={refetch} open={open} setOpen={setOpen} />
    </TransactionStyled>
  );
};

export default Transaction;
