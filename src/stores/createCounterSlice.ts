import create from 'zustand';
const coinSelected = '';
export type CoinStore = {
  coinSelected: string;
  setCoinSelected: (coinType: string) => void;
};
const createCoinStore = create<CoinStore>((set) => ({
  coinSelected: coinSelected,
  setCoinSelected: (coinSelected: string) =>
    set((state: CoinStore) => ({ ...state, coinSelected: coinSelected })),
}));

export default createCoinStore;
