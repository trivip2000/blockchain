// import React from 'react';
import { useSuiClientQuery, useCurrentAccount } from '@mysten/dapp-kit';
// import { useState } from 'react';

const options = {
  showInput: true,
  showBalanceChanges: true,
  showObjectChanges: true,
  showEffects: true,
  showEvents: true,
};
function useTransaction() {
  const account = useCurrentAccount();
  const {
    data: dataFrom,
    isPending: isPendingFrom,
    error: errorFrom,
    refetch: refetchFrom,
  } = useSuiClientQuery(
    'queryTransactionBlocks',
    {
      filter: {
        FromAddress: account?.address as string,
      },
      options: options,
    },
    {
      enabled: !!account,
    },
  );
  const {
    data: dataTo,
    isPending: isPendingTo,
    error: errorTo,
    refetch: refetchTo,
  } = useSuiClientQuery(
    'queryTransactionBlocks',
    {
      filter: {
        ToAddress: account?.address as string,
      },
      options: options,
    },
    {
      enabled: !!account,
    },
  );
  const refetch = () => {
    refetchFrom();
    refetchTo();
  };
  return {
    dataTo,
    dataFrom,
    isPending: isPendingFrom || isPendingTo,
    isError: errorFrom || errorTo,
    account,
    refetch,
  };
}

export default useTransaction;
