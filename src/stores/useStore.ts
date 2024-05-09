import create from "zustand";
import createCounterSlice, { CounterSlice } from "./createCounterSlice";

// export type MyState = CounterSlice & FishSlice;
export type MyState = CounterSlice;

const useStore = create<MyState>((set) => ({
  ...createCounterSlice(set)
}));

export default useStore;
