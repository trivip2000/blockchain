import { Card } from 'antd';
// import { getEclipseAddress } from '@/constants';
import { TransactionStyled } from './styled';
import ReceiveTransactions from './ReceiveTransactions';
import SendTransactions from './SendTransactions';
export default function OwnedObjects() {
  return (
    <TransactionStyled>
      <Card title="Your Activity" bordered={false} style={{ width: 400 }}>
        <SendTransactions />
        <ReceiveTransactions />
      </Card>
    </TransactionStyled>
  );
}
