import { createContext, type Dispatch, useContext, useReducer } from "react";
import { type Action, initialState, type Locale, reducer, type Store } from "./Store";

interface Props {
    children: JSX.Element | JSX.Element[];
    /**
     * Locale selected server-side by Astro's i18n routing (the URL prefix the
     * request actually matched). Passed explicitly from the island entry
     * point so the server-selected prefix and the React locale can't disagree
     * on first render. Falls back to `initialState`'s pathname-based
     * detection when omitted (e.g. in tests).
     */
    initialLocale?: Locale;
}

export const StoreContext = createContext({} as [Store, Dispatch<Action>]);
export const StoreProvider = (props: Props) => {
    const { children, initialLocale } = props;

    const value = useReducer(reducer, undefined, () => (initialLocale ? { ...initialState, locale: initialLocale } : initialState));

    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
export const useStore = () => useContext(StoreContext);
