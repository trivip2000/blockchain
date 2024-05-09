import {  StoreApi } from "zustand";
import { MyState } from "./useStore";

export interface CounterSlice {
  counter: number;
  incrementCounter: () => void;
  decrementCounter: () => void;
}

const counter = 0;

const createCounterSlice = (
  set:  StoreApi<MyState>['setState'],
) => ({
  counter,
  incrementCounter: () => set((state) => ({ counter: state.counter + 1 })),
  decrementCounter: () => set((state) => ({ counter: state.counter - 1 }))
});

export default createCounterSlice