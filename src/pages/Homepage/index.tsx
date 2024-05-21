import ConnectButton from './ConnectButton';
// import { Box, Container } from '@radix-ui/themes';
import { WalletStatus } from './WalletStatus';
import { Card } from 'antd';
function App() {
  return (
    <>
      <div className="flex p-4 justify-between">
        <h2>Sui dApp</h2>

        <div>
          <ConnectButton />
        </div>
      </div>
      <Card title="Card title" bordered={false} style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </>
  );
}

export default App;
