import { useState } from 'react';
import {
  ConnectModal,
  useCurrentAccount,
  useWallets,
  // useSignAndExecuteTransactionBlock,
} from '@mysten/dapp-kit';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import styled from 'styled-components';
// import { JsonRpcProvider, RawSigner } from '@mysten/sui.js';
export default function ConnectButton() {
  // const { mutate: signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock();
  // const [digest, setDigest] = useState('');
  const currentAccount = useCurrentAccount();
  const wallets = useWallets();
  console.log(currentAccount, 'currentAccount');
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
    console.log(wallets, '23123123');
    const client = new SuiClient({
      url: getFullnodeUrl('testnet'),
    });

    const txb = new TransactionBlock();

    const coins = await client.getCoins({
      owner: '0xec026a90f6e5f118b2cdbd0a9573ab4a793eb3a24e033e1ed97d755653d5469f',
    });
    txb.setGasPayment(
      coins.data.map((coin) => ({
        version: coin.version,
        digest: coin.digest,
        objectId: coin.coinObjectId,
      })),
    );
    const [coin] = txb.splitCoins(txb.gas, [txb.pure(100000)]);
    console.log([coin], 'coins123');
    // Transfer the split coin to a specific address.
    txb.transferObjects(
      [coin],
      txb.pure('0xdddf22dcb97ca9ad26724da80b939bb39a2545a23a22a117ee0af0a210fc5bee', 'address'),
    );
    const result = await client.signAndExecuteTransactionBlock({
      signer: keypair,
      transactionBlock: txb,
    });
    // console.log({ result });
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
            <button onClick={handleSigned}>Send</button>
          </div>
          {/* <div>Digest: {digest}</div> */}
        </>
      )}
    </>
  );
}
