import { useState } from 'react';
import {
  ConnectModal,
  useCurrentAccount,
  useDisconnectWallet,
  // useSuiClientMutation,
  // useSignAndExecuteTransactionBlock,
} from '@mysten/dapp-kit';

import styled from 'styled-components';
// import { JsonRpcProvider, RawSigner } from '@mysten/sui.js';
export default function ConnectButton() {
  // const { mutate: signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock();
  // const [digest, setDigest] = useState('');
  // const accounts = useAccounts();
  const currentAccount = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  // const { mutate: switchAccount } = useSwitchAccount();
  // const { mutate } = useSuiClientMutation('dryRunTransactionBlock');
  console.log(currentAccount, 'currentAccount');
  // const address = currentAccount?.address;

  const [open, setOpen] = useState(false);
  const ButtonConnect = styled.button`
    background-color: black;
    border-color: white;
    max-width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `;

  return (
    <>
      <ConnectModal
        trigger={
          <ButtonConnect> {currentAccount ? currentAccount.address : 'Connect'}</ButtonConnect>
        }
        open={open}
        onOpenChange={(isOpen) => setOpen(isOpen)}
      />
      {currentAccount && (
        <>
          <div>
            <button onClick={() => disconnect()}>Disconnect</button>
          </div>
          {/* <div>Digest: {digest}</div> */}
        </>
      )}
    </>
  );
}
