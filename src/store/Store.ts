import type { HTTPError } from "../components/errorMessage/ErrorMessage";
import type { Auth, FetchAuth } from "../types/authInfo";
import type { KontaktInfo } from "../types/kontaktInfo";
import type { MedlInfo } from "../types/medl";
import type { PersonInfo } from "../types/personInfo";
import type { FetchKontaktInfo } from "../views/forside/sections/4-personinfo/2-kontaktinfo/subsections/kontakt-og-reservasjonsregisteret/DKIF-Fetch";
import type { FetchMedlInfo } from "../views/medlemskap-i-folketrygden/MedlFetch";
import type { FetchPersonInfo } from "./providers/PersonInfo";

export type Locale = "nb" | "en" | "nn";

export interface Store {
    locale: Locale;
    authInfo: FetchAuth;
    personInfo: FetchPersonInfo;
    kontaktInfo: FetchKontaktInfo;
    medlInfo: FetchMedlInfo;
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

export type InitialData = Partial<Pick<Store, "personInfo" | "kontaktInfo" | "medlInfo">>;

export const createInitialState = (
    locale = getInitialLocale(),
    authInfo: FetchAuth = { status: "LOADING" },
    initialData: InitialData = {},
): Store => ({
    locale,
    authInfo,
    personInfo: { status: "LOADING" },
    kontaktInfo: { status: "LOADING" },
    medlInfo: { status: "LOADING" },
    ...initialData,
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
      }
    | {
          type: "SETT_KONTAKT_INFO_RESULT";
          payload: KontaktInfo;
      }
    | {
          type: "SETT_KONTAKT_INFO_ERROR";
          payload: HTTPError;
      }
    | {
          type: "SETT_MEDL_INFO_RESULT";
          payload: MedlInfo;
      }
    | {
          type: "SETT_MEDL_INFO_ERROR";
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
        case "SETT_KONTAKT_INFO_RESULT":
            return {
                ...state,
                kontaktInfo: {
                    status: "RESULT",
                    data: action.payload,
                } as FetchKontaktInfo,
            };
        case "SETT_KONTAKT_INFO_ERROR":
            return {
                ...state,
                kontaktInfo: {
                    status: "ERROR",
                    error: action.payload,
                } as FetchKontaktInfo,
            };
        case "SETT_MEDL_INFO_RESULT":
            return {
                ...state,
                medlInfo: {
                    status: "RESULT",
                    data: action.payload,
                } as FetchMedlInfo,
            };
        case "SETT_MEDL_INFO_ERROR":
            return {
                ...state,
                medlInfo: {
                    status: "ERROR",
                    error: action.payload,
                } as FetchMedlInfo,
            };
        default:
            return state;
    }
};
