import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';
import moment from 'moment';
import { Collapse } from 'antd';
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
  return <Collapse items={items}></Collapse>;
}

export default ReceiveTransactions;
