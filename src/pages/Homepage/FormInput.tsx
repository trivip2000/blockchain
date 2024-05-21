import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import { Buffer } from 'buffer';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { TransactionBlock } from '@mysten/sui.js/transactions';
type sendInfo = {
  address: string;
  amount: number;
};
type Values = {
  sendlist: sendInfo[];
};
const onFinish = async (values: Values) => {
  console.log(values, '2132135values');
  const result1 = Uint8Array.from(
    Buffer.from('5162d5a4aadb9afedb6d611f5a1e5a5d88eae3aec5b460aa5bcb8e8b5ff27ba2', 'hex'),
  );
  console.log(result1, '23123123');
  const keypair = Ed25519Keypair.fromSecretKey(result1);
  // console.log(result1, '213213155');
  const publicKey = keypair.getPublicKey();
  const address = publicKey.toSuiAddress();
  // console.log(
  //   HexString.fromUint8Array(fromB64(keypair.export().privateKey)).toString(),
  //   '3213213faddress',
  // );
  console.log(address, '23123123');

  const client = new SuiClient({
    url: getFullnodeUrl('devnet'),
  });

  const txb = new TransactionBlock();

  const coinsRes = await client.getCoins({
    owner: '0xdeebce3e200d785d2a55e436383aeab778194c1a9b195df6bf2277f2c2b6c0b9',
  });
  console.log(coinsRes, '213123coinsRes');
  // const coins = coinsRes.data;
  txb.setGasPayment(
    coinsRes.data.map((coin) => ({
      version: coin.version,
      digest: coin.digest,
      objectId: coin.coinObjectId,
    })),
  );
  const transfers = values.sendlist?.map((item) => ({ to: item.address, amount: item.amount }));
  const coins = txb.splitCoins(
    txb.gas,
    transfers.map((transfer) => txb.pure(transfer.amount)),
  );
  transfers.forEach((transfer, index) => {
    txb.transferObjects([coins[index]], txb.pure(transfer.to));
  });
  const result = await client.signAndExecuteTransactionBlock({
    signer: keypair,
    transactionBlock: txb,
  });
  // console.log({ result });
  console.log({ result });
};

const App: React.FC = () => (
  <Form
    name="dynamic_form_nest_item"
    onFinish={onFinish}
    style={{ maxWidth: 600 }}
    autoComplete="off"
    className="mt-4"
  >
    <Form.List name="sendlist">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} className="grid grid-cols-[1fr_1fr_20px]" align="baseline">
              <Form.Item
                {...restField}
                name={[name, 'address']}
                rules={[{ required: true, message: 'Missing address' }]}
              >
                <Input placeholder="Address" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'amount']}
                rules={[{ required: true, message: 'Missing amount' }]}
              >
                <Input placeholder="Amount" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add New Send Coins
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
    <Form.Item className="flex justify-end">
      <Button type="primary" htmlType="submit">
        Send
      </Button>
    </Form.Item>
  </Form>
);

export default App;
