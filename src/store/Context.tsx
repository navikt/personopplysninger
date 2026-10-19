import { createContext, type Dispatch, useContext, useReducer } from "react";
import type { FetchAuth } from "@/types/authInfo";
import { type Action, createInitialState, type InitialData, type Locale, reducer, type Store } from "./Store";

interface Props {
    children: JSX.Element | JSX.Element[];
    initialLocale?: Locale;
    initialAuthInfo?: FetchAuth;
    initialData?: InitialData;
}

export const StoreContext = createContext({} as [Store, Dispatch<Action>]);
export const StoreProvider = (props: Props) => {
    const { children, initialLocale, initialAuthInfo, initialData } = props;

    return (
        <StoreContext.Provider value={useReducer(reducer, createInitialState(initialLocale, initialAuthInfo, initialData))}>
            {children}
        </StoreContext.Provider>
    );
};
export const useStore = () => useContext(StoreContext);
