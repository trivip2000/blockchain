import { StoreApi } from 'zustand';
import { MyState } from './useStore';

const coinSelected = '0x2::sui::SUI';

const createCoinStore = (set: StoreApi<MyState>['setState']) => ({
  coinSelected,
  setCoinSelected: (coin: string) => set((state) => ({ ...state, coinSelected: coin })),
});

export default createCoinStore;
