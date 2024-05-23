import { useState } from 'react';
import { ConnectModal, useCurrentAccount, useDisconnectWallet } from '@mysten/dapp-kit';
import { Popover, Tooltip } from 'antd';
import ListTokens from '@/components/ListTokens';
import { ButtonConnect } from '../styled';
import Copy from '@/assets/copy.svg?react';

export default function ConnectButton() {
  const currentAccount = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();

  const address = `${currentAccount?.address.slice(0, 5)}...${currentAccount?.address.slice(-5)}`;
  const content = (
    <div className="p-2 flex flex-col min-w-[300px]">
      <div className="mb-6 flex items-center justify-between gap-2">
        <div className="font-bold text-sm">{address}</div>
        <div className="flex items-center gap-2">
          <Tooltip placement="top" title={'Copy'} arrow={false}>
            <button
              type="button"
              className="p-0.5"
              onClick={() => {
                navigator.clipboard.writeText(currentAccount?.address || '');
              }}
            >
              <Copy />
            </button>
          </Tooltip>
          <Tooltip placement="top" title={'Logout'} arrow={false}>
            <button onClick={() => disconnect()} className="p-0.5">
              <svg className="w-5 h-auto" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M6.23972 3.76096C2.64389 5.83702 1.41045 10.4403 3.48651 14.0361C5.56256 17.6319 10.1658 18.8654 13.7617 16.7893C17.3575 14.7133 18.5909 10.11 16.5149 6.51418C15.8302 5.32829 14.8675 4.39954 13.761 3.76096"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M9.98242 1.66797L10.0009 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </Tooltip>
        </div>
      </div>
      <div className="mb-3 font-medium text-2xs items-start flex  justify-between flex-col gap-4">
        Your Tokens
        <ListTokens />
      </div>
    </div>
  );
  const [open, setOpen] = useState(false);

  return (
    <>
      {currentAccount && currentAccount.address ? (
        <Popover placement="topLeft" arrow={false} content={content} trigger="click">
          <ButtonConnect>
            {`${currentAccount?.address.slice(0, 5)}...${currentAccount?.address.slice(-5)}`}
          </ButtonConnect>
        </Popover>
      ) : (
        <ConnectModal
          trigger={<ButtonConnect>{'Connect Wallet'}</ButtonConnect>}
          open={open}
          onOpenChange={(isOpen) => setOpen(isOpen)}
        />
      )}
    </>
  );
}
