import React from 'react';
import { Card } from 'antd';
import { TransactionStyled } from '../styled';
import ReceiveTransactions from './ReceiveTransactions';
import SendTransactions from './SendTransactions';

const Transaction: React.FC = () => {
  return (
    <TransactionStyled>
      <Card title="Your Activity" bordered={false} style={{ width: 400 }}>
        <SendTransactions />
        <ReceiveTransactions />
      </Card>
    </TransactionStyled>
  );
};

export default Transaction;
