import React from 'react';
import ConnectButton from './components/ConnectButton';
import Transaction from './components/Transaction';
import { Card } from 'antd';
import { useCurrentAccount } from '@mysten/dapp-kit';

const Homepage: React.FC = () => {
  // Use the useCurrentAccount hook to get information about the current account
  const account = useCurrentAccount();

  return (
    <>
      <div className="flex p-4 justify-between">
        <p className="text-3xl font-bold flex gap-4 items-center">Sui dApp</p>

        <div>
          <ConnectButton />
        </div>
      </div>
      <div className="flex justify-center">
        {account ? (
          <div className="flex justify-center">
            <Transaction />
          </div>
        ) : (
          <Card className="w-[300px] font-bold flex justify-center">
            Wallet not connected. <br />
            Please connect wallet.
          </Card>
        )}
      </div>
    </>
  );
};

export default Homepage;
