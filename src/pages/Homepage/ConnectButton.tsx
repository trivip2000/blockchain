import { useState } from 'react';
import { ConnectModal, useCurrentAccount, useDisconnectWallet } from '@mysten/dapp-kit';
import { Popover, Tooltip } from 'antd';
import styled from 'styled-components';
import ListTokens from './ListTokens';
export default function ConnectButton() {
  const currentAccount = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  console.log(currentAccount, 'currentAccount');
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
              <svg className="w-5 h-auto" width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16 12.9v4.2c0 3.5-1.4 4.9-4.9 4.9H6.9C3.4 22 2 20.6 2 17.1v-4.2C2 9.4 3.4 8 6.9 8h4.2c3.5 0 4.9 1.4 4.9 4.9z"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M22 6.9v4.2c0 3.5-1.4 4.9-4.9 4.9H16v-3.1C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2h4.2C20.6 2 22 3.4 22 6.9z"
                ></path>
              </svg>
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
  const ButtonConnect = styled.button`
    background-color: rgb(46, 29, 69);
    border-color: white;
    color: white;
    max-width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-color: white;
  `;

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
      {currentAccount && (
        <>
          <div></div>
          {/* <div>Digest: {digest}</div> */}
        </>
      )}
    </>
  );
}
