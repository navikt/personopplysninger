import React, { createContext, useContext, useReducer, Dispatch } from "react";
import { Action, Store, initialState, reducer } from "./Store";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const StoreContext = createContext({} as [Store, Dispatch<Action>]);
export const StoreProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};
export const useStore = () => useContext(StoreContext);
