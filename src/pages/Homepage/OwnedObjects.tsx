import { useState } from 'react';
import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';
import { Flex, Heading, Text } from '@radix-ui/themes';
import ModalSendToken from './ModalSendToken';
import { Button } from 'antd';
export function OwnedObjects() {
  const account = useCurrentAccount();
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const { data, isPending, error } = useSuiClientQuery(
    'getAllBalances',
    {
      owner: account?.address as string,
    },
    {
      enabled: !!account,
    },
  );

  if (!account) {
    return;
  }

  if (error) {
    return <Flex>Error: {error.message}</Flex>;
  }

  if (isPending || !data) {
    return <Flex>Loading...</Flex>;
  }
  return (
    <Flex direction="column" my="2">
      {data.length === 0 ? <Text>No tokens</Text> : <Heading size="4">List tokens</Heading>}
      {data.map((object) => (
        <Flex key={object?.coinType}>
          <Text>
            {object?.coinType} : {object?.totalBalance}{' '}
            <Button type="primary" onClick={showModal}>
              Sends Coin
            </Button>
          </Text>
        </Flex>
      ))}
      <ModalSendToken open={open} setOpen={setOpen} />
    </Flex>
  );
}
