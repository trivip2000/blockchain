import create from 'zustand';
import createCoinStore from './createCounterSlice';

import { CounterSlice } from './interfaces';
// export type MyState = CounterSlice & FishSlice;
export type MyState = CounterSlice;

const useStore = create<MyState>((set) => ({
  ...createCoinStore(set),
}));

export default useStore;
