import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button, Input, Space, InputNumber, Select } from 'antd';
import { useSignAndExecuteTransactionBlock, useCurrentAccount } from '@mysten/dapp-kit';
import useStore from '@/stores/createCounterSlice';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { mapCoinName, getSuiNumber } from '@/constants';
type FormValues = {
  cart: {
    address: string;
    amount: number;
    coinType?: string;
  }[];
};
type DataType = {
  coinObjectCount: number;
  coinType: string;
  totalBalance: string;
  // add other properties as needed
};

interface FormInputProps {
  handleCancel: () => void; // adjust this as necessary based on the actual function signature
  // include other props here...
  data: DataType[];
}
export default function FormInput({ handleCancel, data }: FormInputProps) {
  const { mutate: signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock();
  const coinSelected = useStore((state) => state.coinSelected);
  const account = useCurrentAccount();
  const { register, control, handleSubmit, getValues } = useForm<FormValues>({
    defaultValues: {
      cart: [{ address: '', amount: 0, coinType: coinSelected }],
    },
    mode: 'onBlur',
  });
  const { fields, append, remove, update } = useFieldArray({
    name: 'cart',
    control,
  });
  const onFinish = async (values: FormValues) => {
    // Create a new SuiClient and TransactionBlock
    const client = new SuiClient({
      url: getFullnodeUrl(import.meta.env.VITE_DEFAULT_NETWORK),
    });
    const txb = new TransactionBlock();

    // Get the coins for the current account
    const coinsRes = await client.getCoins({
      owner: account?.address || '',
    });
    const coinType: string[] = values.cart?.map((item) => item.coinType as string);

    // Set the gas payment for the transaction block
    txb.setGasPayment(
      coinsRes.data
        .filter((item) => coinType.includes(item.coinType))
        .map((coin) => ({
          version: coin.version,
          digest: coin.digest,
          objectId: coin.coinObjectId,
        })),
    );

    // Define the transfers and split the coins for the transaction
    const transfers = values.cart?.map((item) => ({ to: item.address, amount: item.amount }));
    const coins = txb.splitCoins(
      txb.gas,
      transfers.map((transfer) => txb.pure(transfer.amount)),
    );

    // Add the transfers to the transaction block
    transfers.forEach((transfer, index) => {
      txb.transferObjects([coins[index]], txb.pure(transfer.to));
    });

    // Sign and execute the transaction block
    await signAndExecuteTransactionBlock({
      transactionBlock: txb,
    });

    handleCancel();
  };

  // Define the function to set the maximum coin amount for a row
  const setMaxCoin = (fieldKey: number) => {
    const row = getValues(`cart.${fieldKey}`);
    console.log(row, '21321355');
    const coinType = row.coinType;
    const coinBalance = data.find((item) => item.coinType == coinType);
    let amount = 0;
    if (coinBalance) {
      amount = Number(coinBalance.totalBalance);
    }
    update(fieldKey, { ...row, amount: amount - 50000000 });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onFinish)}>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section
                className="grid grid-cols-[1fr_1fr_1fr_20px] section gap-2 mb-2"
                key={field.id}
              >
                <Controller
                  // name="address"
                  {...register(`cart.${index}.coinType` as const, {
                    required: true,
                  })}
                  // defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Select
                      // style={{ width: 120 }}
                      {...field}
                      placeholder="Coin"
                      options={data.map((item) => ({
                        value: item.coinType,
                        label:
                          (mapCoinName[item.coinType] || '') +
                          '-' +
                          getSuiNumber(item.totalBalance),
                      }))}
                    />
                  )}
                />
                <Controller
                  {...register(`cart.${index}.address` as const, {
                    required: true,
                  })}
                  control={control}
                  render={({ field }) => <Input placeholder="Address" {...field} />}
                />
                <Controller
                  {...register(`cart.${index}.amount` as const, {
                    required: true,
                  })}
                  control={control}
                  render={({ field }) => (
                    <Space.Compact style={{ width: '100%' }}>
                      <InputNumber
                        className="w-full [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="Amount"
                        {...field}
                      />
                      <Button onClick={() => setMaxCoin(index)} className="p-1">
                        Max
                      </Button>
                    </Space.Compact>
                  )}
                />

                <MinusCircleOutlined onClick={() => remove(index)} />
              </section>
            </div>
          );
        })}
        <Button
          type="dashed"
          className=" mt-4"
          onClick={() =>
            append({
              address: '',
              amount: 0,
              coinType: coinSelected,
            })
          }
          block
          icon={<PlusOutlined />}
        >
          Add New Send Coin
        </Button>

        <div className="flex justify-end mt-4">
          <Button type="primary" htmlType="submit">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
