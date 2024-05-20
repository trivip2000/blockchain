import { useState } from 'react';
import { ConnectModal, useCurrentAccount } from '@mysten/dapp-kit';
import styled from 'styled-components';
export default function ConnectButton() {
  const currentAccount = useCurrentAccount();
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
    <ConnectModal
      trigger={
        <ButtonConnect> {currentAccount ? currentAccount.address : 'Connect'}</ButtonConnect>
      }
      open={open}
      onOpenChange={(isOpen) => setOpen(isOpen)}
    />
  );
}
