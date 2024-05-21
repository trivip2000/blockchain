import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';
import { mapCoinName, getSuiNumber } from '@/constants';
import ModalSendToken from './ModalSendToken';
import { useState } from 'react';
import createCoinStore from '@/stores/createCounterSlice';
function ListTokens() {
  const account = useCurrentAccount();
  const setCoinSelected = createCoinStore((state) => state.setCoinSelected);
  const [open, setOpen] = useState(false);
  const showModal = (coinType: string) => {
    setOpen(true);
    setCoinSelected(coinType);
  };
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
    <div className="flex min-w-full justify-between cursor-pointer transition hover:bg-[#f3f3f3] rounded">
      {data.length === 0 && <p>No tokens</p>}
      {data.map((object) => (
        <div
          className="flex min-w-full justify-between  p-2"
          key={object?.coinObjectCount}
          onClick={() => showModal(object?.coinType)}
        >
          <div>
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>{mapCoinName[object?.coinType] || ''}</div>
            </div>
          </div>
          <div>{getSuiNumber(object?.totalBalance || '')}</div>
        </div>
      ))}
      <ModalSendToken open={open} setOpen={setOpen} data={data} />
    </div>
  );
}

export default ListTokens;
