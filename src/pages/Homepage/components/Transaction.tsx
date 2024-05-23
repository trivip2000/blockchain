import React from 'react';
import { Card } from 'antd';
import { TransactionStyled } from '../styled';
import ReceiveTransactions from './ReceiveTransactions';
import SendTransactions from './SendTransactions';

const Transaction: React.FC = () => {
  return (
    <TransactionStyled>
      <Card title="Your Activity" bordered={false} className="w-[300px] sm:w-[520px]">
        <SendTransactions />
        <ReceiveTransactions />
      </Card>
    </TransactionStyled>
  );
};

export default Transaction;
