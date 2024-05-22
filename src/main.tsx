import React from 'react';
import ReactDOM from 'react-dom/client';
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui.js/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import router from './router';
import { ConfigProvider } from 'antd';
import '@mysten/dapp-kit/dist/index.css';
import '@radix-ui/themes/styles.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { RouterProvider } from 'react-router-dom';

const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl('localnet') },
  devnet: { url: getFullnodeUrl('devnet') },
  testnet: { url: getFullnodeUrl('testnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
});
const queryClient = new QueryClient();
const client = new ApolloClient({
  uri: 'https://flyby-router-demo.herokuapp.com/',
  cache: new InMemoryCache(),
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: '"Lexend", sans-serif',
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider
          networks={networkConfig}
          defaultNetwork={import.meta.env.VITE_DEFAULT_NETWORK}
        >
          <WalletProvider autoConnect>
            <ApolloProvider client={client}>
              <RouterProvider router={router} />
            </ApolloProvider>
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </ConfigProvider>
  </React.StrictMode>,
);
