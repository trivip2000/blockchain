import moment from 'moment';
import { Collapse, Card } from 'antd';
import { BalanceChangesProps, ObjectCardProps } from './../types';
import ObjectCard from '@/components/ObjectCard';
import BalanceCard from '@/components/BalanceCard';
import { getBlance } from '@/constants';
import { TransactionBlock } from '../styled';
interface TransactionData {
  timestampMs: string;
  balanceChanges: BalanceChangesProps[];
  objectChanges: ObjectCardProps[];
  transaction: {
    data: {
      gasData: {
        price: string;
      };
    };
  };
}

export interface ReceiveTransactionsProps {
  data: TransactionData[];
}
function ReceiveTransactions({ data }: ReceiveTransactionsProps) {
  const items = data.map((item) => {
    return {
      key: item.timestampMs || '',
      label: (
        <div className="flex flex-col">
          <span className="font">Transaction</span>
          <span className="text-[#758F9E]">
            {moment(Number(item.timestampMs)).format('HH:ss DD/MM/YYYY')}
          </span>
        </div>
      ),
      children: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(item.balanceChanges as BalanceChangesProps[])?.map((balance) => (
            <BalanceCard key={balance.amount || ''} balance={balance} />
          ))}
          {(item.objectChanges as ObjectCardProps[])?.map((object) => (
            <ObjectCard key={object.objectId || ''} object={object} />
          ))}
          <Card>
            <div className="flex justify-between">
              <p className="font-medium">GAS FEES</p>
              <span>{getBlance(item.transaction?.data.gasData?.price as string)}</span>
            </div>
          </Card>
        </div>
      ),
    };
  });
  return (
    <TransactionBlock>
      <Collapse items={items}></Collapse>
    </TransactionBlock>
  );
}

export default ReceiveTransactions;
