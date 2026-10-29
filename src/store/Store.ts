import type { HTTPError } from "../components/errorMessage/ErrorMessage";
import type { Auth, FetchAuth } from "../types/authInfo";
import type { PersonInfo } from "../types/personInfo";
import type { FetchPersonInfo } from "./providers/PersonInfo";

export type Locale = "nb" | "en" | "nn";

export interface Store {
    locale: Locale;
    authInfo: FetchAuth;
    personInfo: FetchPersonInfo;
}

const getInitialLocale = (): Locale => {
    if (typeof window === "undefined") {
        return "nb";
    }

    if (window.location.pathname.match(/\/en($|\/)/)) {
        return "en";
    }

    if (window.location.pathname.match(/\/nn($|\/)/)) {
        return "nn";
    }

    return "nb";
};

export const createInitialState = (locale = getInitialLocale(), authInfo: FetchAuth = { status: "LOADING" }, personInfo?: PersonInfo): Store => ({
    locale,
    authInfo,
    personInfo: personInfo ? { status: "RESULT", data: personInfo } : { status: "LOADING" },
});

export const initialState = createInitialState();

export type Action =
    | {
          type: "SETT_AUTH_RESULT";
          payload: Auth;
      }
    | {
          type: "SETT_PERSON_INFO_RESULT";
          payload: PersonInfo;
      }
    | {
          type: "SETT_PERSON_INFO_ERROR";
          payload: HTTPError;
      };

export const reducer = (state: Store, action: Action) => {
    switch (action.type) {
        case "SETT_AUTH_RESULT":
            return {
                ...state,
                authInfo: {
                    status: "RESULT",
                    data: action.payload,
                } as FetchAuth,
            };
        case "SETT_PERSON_INFO_RESULT":
            return {
                ...state,
                personInfo: {
                    status: "RESULT",
                    data: action.payload,
                } as FetchPersonInfo,
            };
        case "SETT_PERSON_INFO_ERROR":
            return {
                ...state,
                personInfo: {
                    status: "ERROR",
                    error: action.payload,
                } as FetchPersonInfo,
            };
        default:
            return state;
    }
};
