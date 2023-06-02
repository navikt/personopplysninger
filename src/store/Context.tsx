import { createContext, useContext, useReducer, Dispatch } from 'react';
import { Action, initialState, reducer, Store } from './Store';
interface Props {
    children: JSX.Element | JSX.Element[];
}

export const StoreContext = createContext({} as [Store, Dispatch<Action>]);
export const StoreProvider = (props: Props) => {
    const { children } = props;

    return <StoreContext.Provider value={useReducer(reducer, initialState)}>{children}</StoreContext.Provider>;
};
export const useStore = () => useContext(StoreContext);
