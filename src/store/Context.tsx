import { createContext, type Dispatch, useContext, useReducer } from "react";
import type { FetchAuth } from "@/types/authInfo";
import type { PersonInfo } from "@/types/personInfo";
import { type Action, createInitialState, type Locale, reducer, type Store } from "./Store";

interface Props {
    children: JSX.Element | JSX.Element[];
    initialLocale?: Locale;
    initialAuthInfo?: FetchAuth;
    initialPersonInfo?: PersonInfo;
}

export const StoreContext = createContext({} as [Store, Dispatch<Action>]);
export const StoreProvider = (props: Props) => {
    const { children, initialLocale, initialAuthInfo, initialPersonInfo } = props;

    return (
        <StoreContext.Provider value={useReducer(reducer, createInitialState(initialLocale, initialAuthInfo, initialPersonInfo))}>
            {children}
        </StoreContext.Provider>
    );
};
export const useStore = () => useContext(StoreContext);
