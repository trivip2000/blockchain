import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { useSignAndExecuteTransactionBlock, useCurrentAccount } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
type sendInfo = {
  address: string;
  amount: number;
};
type Values = {
  sendlist: sendInfo[];
};

const App: React.FC = () => {
  const { mutate: signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock();
  const account = useCurrentAccount();
  const onFinish = async (values: Values) => {
    // const result1 = Uint8Array.from(
    //   Buffer.from('5162d5a4aadb9afedb6d611f5a1e5a5d88eae3aec5b460aa5bcb8e8b5ff27ba2', 'hex'),
    // );
    // const keypair = Ed25519Keypair.fromSecretKey(result1);
    const client = new SuiClient({
      url: getFullnodeUrl('devnet'),
    });

    const txb = new TransactionBlock();

    const coinsRes = await client.getCoins({
      owner: account?.address || '',
    });
    // const coins = coinsRes.data;
    txb.setGasPayment(
      coinsRes.data
        .filter((item) => item.coinType === '0x2::sui::SUI')
        .map((coin) => ({
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
    const result = await signAndExecuteTransactionBlock({
      transactionBlock: txb,
    });
    // console.log({ result });
    console.log({ result });
  };
  return (
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
};

export default App;
