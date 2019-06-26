import { FetchKontaktInfo } from "../pages/forside/sections/4-personinfo/kontakt-informasjon/subsections/DKIF";
import { FetchPersonInfo } from "../pages/forside/sections/4-personinfo/PersonInfo";
import { PersonInfo } from "../types/personInfo";
import { KontaktInfo } from "../types/kontaktInfo";
import { HTTPError } from "../components/error/Error";
import { FetchFeatureToggles } from "../App";

export interface FeatureToggles {
  [key: string]: boolean;
}

export const initialState = {
  featureToggles: {
    status: "LOADING",
    data: {
      "personopplysninger.arbeidsforhold.liste": false,
      "personopplysninger.arbeidsforhold.detaljert": false
    }
  } as FetchFeatureToggles,
  personInfo: { status: "LOADING" } as FetchPersonInfo,
  kontaktInfo: { status: "LOADING" } as FetchKontaktInfo
};

export interface Store {
  featureToggles: FetchFeatureToggles;
  personInfo: FetchPersonInfo;
  kontaktInfo: FetchKontaktInfo;
}

export type Action =
  | {
      type: "SETT_FEATURE_TOGGLES";
      payload: FeatureToggles;
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
    };

export const reducer = (state: Store, action: Action) => {
  switch (action.type) {
    case "SETT_FEATURE_TOGGLES":
      return {
        ...state,
        featureToggles: {
          ...state.featureToggles,
          data: action.payload
        } as FetchFeatureToggles
      };
    case "SETT_PERSON_INFO_RESULT":
      return {
        ...state,
        personInfo: {
          status: "RESULT",
          data: action.payload
        } as FetchPersonInfo
      };
    case "SETT_PERSON_INFO_ERROR":
      return {
        ...state,
        personInfo: {
          status: "ERROR",
          error: action.payload
        } as FetchPersonInfo
      };
    case "SETT_KONTAKT_INFO_RESULT":
      return {
        ...state,
        kontaktInfo: {
          status: "RESULT",
          data: action.payload
        } as FetchKontaktInfo
      };
    case "SETT_KONTAKT_INFO_ERROR":
      return {
        ...state,
        kontaktInfo: {
          status: "ERROR",
          error: action.payload
        } as FetchKontaktInfo
      };
    default:
      return state;
  }
};
