import { useState } from 'react';
import {
  ConnectModal,
  useCurrentAccount,
  // useSignAndExecuteTransactionBlock,
} from '@mysten/dapp-kit';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import styled from 'styled-components';

export default function ConnectButton() {
  // const { mutate: signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock();
  // const [digest, setDigest] = useState('');
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
  const handleSigned = async () => {
    const keypair = new Ed25519Keypair();
    const client = new SuiClient({
      url: getFullnodeUrl('testnet'),
    });

    const tx = new TransactionBlock();
    const [coin] = tx.splitCoins(tx.gas, [1000]);
    tx.transferObjects([coin], keypair.getPublicKey().toSuiAddress());
    const result = await client.signAndExecuteTransactionBlock({
      signer: keypair,
      transactionBlock: tx,
    });
    console.log({ result });
  };
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
            <button onClick={handleSigned}>Sign and execute transaction block</button>
          </div>
          {/* <div>Digest: {digest}</div> */}
        </>
      )}
    </>
  );
}
