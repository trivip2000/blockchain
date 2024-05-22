import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';
import moment from 'moment';
import { Collapse, Card } from 'antd';
// import Receive from '@/assets/receive.svg?react';
import Logo from '@/assets/sui-logo.svg?react';
import { getEclipseAddress, getBlance } from '@/constants';
import { TransactionBlock } from './styled';

interface OwnerWithAddress {
  AddressOwner: string;
}

function ReceiveTransactions() {
  const account = useCurrentAccount();
  const { data, isPending, error } = useSuiClientQuery(
    'queryTransactionBlocks',
    {
      filter: {
        ToAddress: account?.address as string,
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
        <div className="flex flex-col gap-3">
          {item.balanceChanges?.map((balance) => {
            return (
              <Card key={balance.amount}>
                <p className="font-medium">Balance Changes</p>
                <div className="flex justify-between mt-6">
                  <span className="flex gap-2">
                    <Logo width="20px" height="20px" />
                    Sui
                  </span>{' '}
                  <span>{getBlance(balance.amount)}</span>
                </div>
                <div className="flex justify-between mt-6">
                  <span className="font-medium">Owner</span>
                  <span>
                    {getEclipseAddress((balance.owner as OwnerWithAddress)?.AddressOwner)}
                  </span>
                </div>
              </Card>
            );
          })}
          {item.objectChanges?.map((object) => {
            return (
              <Card key={('objectId' in object && object.objectId) || ''}>
                <p className="font-medium">Changes</p>
                <p className="font-medium my-3 text-[#008C65]">
                  {object.type == 'mutated' ? 'Update' : 'Created'}
                </p>
                <div className="grid grid-cols-2 gap-1">
                  <span>Object</span>
                  <span className="text-right">
                    {getEclipseAddress(('objectId' in object && object.objectId) || '')}
                  </span>
                  <span>Package</span>
                  <span className="text-right">0x2</span>
                  <span>Module</span>
                  <span className="text-right">coin</span>
                  <span>Type</span>
                  <span className="text-right">Coin</span>
                  <span>Owner</span>
                  <span className="text-right">
                    {'owner' in object &&
                      getEclipseAddress((object.owner as OwnerWithAddress)?.AddressOwner)}
                  </span>
                </div>
              </Card>
            );
          })}
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
