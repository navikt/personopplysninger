import React, {
  createContext,
  useContext,
  useReducer,
  Reducer,
  Dispatch
} from "react";
import { Action, Store } from "./Store";

interface Props {
  reducer: Reducer<Store, Action>;
  initialState: Store;
  children: JSX.Element | JSX.Element[];
}

export const StoreContext = createContext({} as [Store, Dispatch<Action>]);
export const StoreProvider = ({ reducer, initialState, children }: Props) => (
  <StoreContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StoreContext.Provider>
);
export const useStore = () => useContext(StoreContext);
