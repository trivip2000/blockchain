import { MIST_PER_SUI } from '@mysten/sui.js/utils';
export type CoinMap = Record<string, string>;

export const mapCoinName: CoinMap = {
  '0x2::sui::SUI': 'SUI',
};
export const getSuiNumber = (value: string) => {
  return Math.ceil(Number(value) / 1000000000);
};
export const getEclipseAddress = (address: string) => {
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
};
export const getBlance = (balance: string | number) => {
  return Number.parseInt(balance.toString()) / Number(MIST_PER_SUI);
};
export const convertNumberToSui = (amount: number) => {
  return amount * Number(MIST_PER_SUI);
};
