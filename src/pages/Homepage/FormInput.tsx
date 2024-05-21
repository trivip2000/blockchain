import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Select, InputNumber } from 'antd';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { useSignAndExecuteTransactionBlock, useCurrentAccount } from '@mysten/dapp-kit';
import useStore from '@/stores/createCounterSlice';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { mapCoinName, getSuiNumber } from '@/constants';
type sendInfo = {
  address: string;
  amount: number;
  coinType: string;
};
type Values = {
  sendlist: sendInfo[];
};

const App: React.FC = ({ data }) => {
  const { mutate: signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock();
  const coinSelected = useStore((state) => state.coinSelected);
  const [form] = Form.useForm();
  const account = useCurrentAccount();
  const onFinish = async (values: Values) => {
    console.log(values, '12312values');
    const client = new SuiClient({
      url: getFullnodeUrl('devnet'),
    });

    const txb = new TransactionBlock();

    const coinsRes = await client.getCoins({
      owner: account?.address || '',
    });
    const coinType = values.sendlist?.map((item) => item.coinType);
    // const coins = coinsRes.data;
    txb.setGasPayment(
      coinsRes.data
        .filter((item) => coinType.includes(item.coinType))
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
  // const onChangeCoin = (value: string) => {
  //   form.setFieldsValue({ coinType: value });
  // };
  return (
    <Form
      name="dynamic_form_nest_item"
      form={form}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      autoComplete="off"
      className="mt-4"
    >
      <Form.List name="sendlist">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} className="grid grid-cols-[1fr_1fr_1fr_20px]" align="baseline">
                <Form.Item {...restField} name={[name, 'coinType']}>
                  <Select
                    defaultValue={coinSelected}
                    // style={{ width: 120 }}
                    // onChange={onChangeCoin}
                    options={data.map((item) => ({
                      value: item.coinType,
                      label:
                        (mapCoinName[item.coinType] || '') + '-' + getSuiNumber(item.totalBalance),
                    }))}
                  />
                </Form.Item>
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
                  <InputNumber className="w-full" placeholder="Amount" />
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
