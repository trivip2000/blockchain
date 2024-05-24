import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button, Input, Space, InputNumber, Select, notification } from 'antd';
import { useSignAndExecuteTransactionBlock, useCurrentAccount } from '@mysten/dapp-kit';
import useStore from '@/stores/createCounterSlice';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { mapCoinName, getSuiNumber, getBlance, convertNumberToSui } from '@/constants';

type FormValues = {
  cart: {
    address: string;
    amount?: number;
    coinType?: string;
  }[];
};
type DataType = {
  coinObjectCount: number;
  coinType: string;
  totalBalance: string;
  // add other properties as needed
};
type NotificationType = 'success' | 'info' | 'warning' | 'error';
interface FormInputProps {
  handleCancel: () => void; // adjust this as necessary based on the actual function signature
  // include other props here...
  data: DataType[];
  refetch?: () => void;
}
export default function FormInput({ handleCancel, data, refetch }: FormInputProps) {
  const { mutate: signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock();
  const coinSelected = useStore((state) => state.coinSelected);
  const account = useCurrentAccount();
  const [api, contextHolder] = notification.useNotification();
  const {
    register,
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      cart: [{ address: '', coinType: coinSelected }],
    },
    mode: 'onBlur',
  });
  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: 'Notification!!!',
      description: 'Send token success',
    });
  };
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
    const transfers = values.cart?.map((item) => ({
      to: item.address,
      amount: convertNumberToSui(item.amount || 0),
    }));
    const coins = txb.splitCoins(
      txb.gas,
      transfers.map((transfer) => txb.pure(transfer.amount)),
    );

    // Add the transfers to the transaction block
    transfers.forEach((transfer, index) => {
      txb.transferObjects([coins[index]], txb.pure(transfer.to));
    });

    // Sign and execute the transaction block
    await signAndExecuteTransactionBlock(
      {
        transactionBlock: txb,
      },
      {
        onSuccess: (result) => {
          // console.log('executed transaction block', result);
          if (result.digest) {
            openNotificationWithIcon('success');
            refetch && refetch();
            reset();
          }
          // setDigest(result.digest);
        },
      },
    );

    handleCancel();
  };

  // Define the function to set the maximum coin amount for a row
  const setMaxCoin = (fieldKey: number) => {
    const row = getValues(`cart.${fieldKey}`);
    const coinType = row.coinType;
    const coinBalance = data.find((item) => item.coinType == coinType);
    let amount = 0;
    if (coinBalance) {
      amount = getBlance(Number(coinBalance.totalBalance) - 50000000);
    }
    update(fieldKey, { ...row, amount: amount });
  };
  return (
    <div>
      {contextHolder}
      <form onSubmit={handleSubmit(onFinish)}>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section
                className="grid grid-cols-[1fr_1fr_1fr_20px] section gap-2 mb-2"
                key={field.id}
              >
                <div className="flex flex-col">
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
                  {errors.cart && errors.cart[index]?.coinType && (
                    <span className="text-xs italic text-[#FF0000]">Please choose coin</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <Controller
                    {...register(`cart.${index}.address` as const, {
                      required: true,
                    })}
                    control={control}
                    render={({ field }) => <Input placeholder="Address" {...field} />}
                  />
                  {errors.cart && errors.cart[index]?.address && (
                    <span className="text-xs italic text-[#FF0000]">Please input address</span>
                  )}
                </div>
                <div className="flex flex-col">
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
                  {errors.cart && errors.cart[index]?.amount && (
                    <span className="text-xs italic text-[#FF0000]">Please input amount</span>
                  )}
                </div>
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
