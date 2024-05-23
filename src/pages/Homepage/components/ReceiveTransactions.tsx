import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';
import moment from 'moment';
import { Collapse, Card } from 'antd';
import { BalanceChangesProps, ObjectCardProps } from './../types';
import ObjectCard from '@/components/ObjectCard';
import BalanceCard from '@/components/BalanceCard';
import { getBlance } from '@/constants';
import { TransactionBlock } from '../styled';

function ReceiveTransactions() {
  const account = useCurrentAccount();
  const { data, isPending, error } = useSuiClientQuery(
    'queryTransactionBlocks',
    {
      filter: {
        FromAddress: account?.address as string,
      },
      options: {
        showInput: true,
        showBalanceChanges: true,
        showObjectChanges: true,
        showEffects: true,
        showEvents: true,
      },
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
  const items = data.data.map((item) => {
    return {
      key: item.timestampMs || '',
      label: (
        <div className="flex flex-col">
          <span className="font">Receive</span>
          <span className="text-[#758F9E]">
            {moment(Number(item.timestampMs)).format('HH:ss DD/MM/YYYY')}
          </span>
        </div>
      ),
      children: (
        <div className="grid grid-cols-2 gap-3">
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
