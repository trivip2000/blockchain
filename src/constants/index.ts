export type CoinMap = Record<string, string>;

export const mapCoinName: CoinMap = {
  '0x2::sui::SUI': 'SUI',
};
export const getSuiNumber = (value: string) => {
  return Math.ceil(Number(value) / 1000000000);
};
