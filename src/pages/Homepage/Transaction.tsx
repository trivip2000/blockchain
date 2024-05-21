import { useCurrentAccount, useSuiClientQueries } from '@mysten/dapp-kit';
import { Flex } from '@radix-ui/themes';

export default function OwnedObjects() {
  const account = useCurrentAccount();
  const { data, isPending } = useSuiClientQueries({
    queries: [
      {
        method: 'getAllBalances',
        params: {
          owner: account?.address as string,
        },
      },
      {
        method: 'queryTransactionBlocks',
        params: {
          filter: {
            FromAddress: account?.address as string,
          },
        },
      },
    ],
    combine: (result) => {
      return {
        data: result.map((res) => res.data),
        isSuccess: result.every((res) => res.isSuccess),
        isPending: result.some((res) => res.isPending),
        isError: result.some((res) => res.isError),
      };
    },
  });

  if (isPending || !data) {
    return <Flex>Loading...</Flex>;
  }

  //   console.log(dataTransaction, '213215455');
  return <Flex direction="column" my="2"></Flex>;
}
