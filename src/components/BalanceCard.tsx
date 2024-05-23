import React from 'react';
import { Card } from 'antd';
import SuiIcon from './SuiIcon';
import { getEclipseAddress, getBlance } from '@/constants';
interface OwnerWithAddress {
  AddressOwner?: string;
}
interface BalanceCardProps {
  balance: {
    amount?: string;
    owner?: OwnerWithAddress;
  }; // Replace with the actual type of balance
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => (
  <Card key={balance.amount}>
    <p className="font-medium">Balance Changes</p>
    <div className="flex justify-between mt-6">
      <span className="flex gap-2">
        <SuiIcon />
        Sui
      </span>{' '}
      <span>{getBlance(balance.amount || '')}</span>
    </div>
    <div className="flex justify-between mt-6">
      <span className="font-medium">Owner</span>
      <span>{getEclipseAddress((balance.owner as OwnerWithAddress)?.AddressOwner || '')}</span>
    </div>
  </Card>
);

export default BalanceCard;
