import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';
import moment from 'moment';
import { Collapse, Card } from 'antd';
// import { getEclipseAddress } from '@/constants';
import { TransactionStyled } from './styled';
export default function OwnedObjects() {
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
      label: moment(Number(item.timestampMs)).format('HH:ss DD/MM/YYYY'),
      children: (
        <div>
          {item.balanceChanges?.map((balance) => {
            return (
              <div key={balance.amount}>
                <p>Balance Changes</p>
                <div>Sui: {balance.amount}</div>
              </div>
            );
          })}
          <strong>GAS FEES</strong>: {item.transaction?.data.gasData?.budget as string}
        </div>
      ),
    };
  });
  return (
    <TransactionStyled>
      <Card title="Your Activity" bordered={false} style={{ width: 400 }}>
        {data.data && data.data.length > 0 ? (
          <Collapse items={items}></Collapse>
        ) : (
          <strong> Wallet connected but no activity.</strong>
        )}
      </Card>
    </TransactionStyled>
  );
}
