import { FetchKontaktInfo } from "../pages/forside/sections/4-personinfo/2-kontaktinfo/subsections/kontakt-og-reservasjonsregisteret/DKIF-Fetch";
import { PersonInfo } from "../types/personInfo";
import { KontaktInfo } from "../types/kontaktInfo";
import { HTTPError } from "../components/error/Error";
import { AuthInfo } from "../types/authInfo";
import { FetchAuthInfo } from "./auth/Auth";
import { FetchFeatureToggles } from "./featuretoggles/FeatureToggles";
import { FetchDsopInfo } from "../pages/digital-samhandling-offentlig-privat/DsopFetch";
import { DsopInfo } from "../types/dsop";
import { FetchPersonInfo } from "./personinfo/PersinInfo";
import { InstInfo } from "../types/inst";
import { FetchInstInfo } from "../pages/institusjonsopphold/InstFetch";

export interface FeatureToggles {
  [key: string]: boolean;
}

export const initialState = {
  auth: { status: "LOADING" } as FetchAuthInfo,
  featureToggles: {
    status: "LOADING",
    data: {
      "personopplysninger.dsop": false,
      "personopplysninger.pdl": false,
      "personopplysninger.inst": false
    }
  } as FetchFeatureToggles,
  dsopInfo: { status: "LOADING" } as FetchDsopInfo,
  instInfo: { status: "LOADING" } as FetchInstInfo,
  personInfo: { status: "LOADING" } as FetchPersonInfo,
  kontaktInfo: { status: "LOADING" } as FetchKontaktInfo
};

export interface Store {
  auth: FetchAuthInfo;
  featureToggles: FetchFeatureToggles;
  personInfo: FetchPersonInfo;
  dsopInfo: FetchDsopInfo;
  instInfo: FetchInstInfo;
  kontaktInfo: FetchKontaktInfo;
}

export type Action =
  | {
      type: "SETT_AUTH_RESULT";
      payload: AuthInfo;
    }
  | {
      type: "SETT_AUTH_ERROR";
      payload: HTTPError;
    }
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
    }
  | {
      type: "SETT_DSOP_INFO_RESULT";
      payload: DsopInfo;
    }
  | {
      type: "SETT_DSOP_INFO_ERROR";
      payload: HTTPError;
    }
  | {
      type: "SETT_INST_INFO_RESULT";
      payload: InstInfo;
    }
  | {
      type: "SETT_INST_INFO_ERROR";
      payload: HTTPError;
    };

export const reducer = (state: Store, action: Action) => {
  switch (action.type) {
    case "SETT_AUTH_RESULT":
      return {
        ...state,
        auth: {
          status: "RESULT",
          data: action.payload
        } as FetchAuthInfo
      };
    case "SETT_AUTH_ERROR":
      return {
        ...state,
        auth: {
          status: "ERROR",
          error: action.payload
        } as FetchAuthInfo
      };
    case "SETT_FEATURE_TOGGLES":
      return {
        ...state,
        featureToggles: {
          status: "RESULT",
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
    case "SETT_DSOP_INFO_RESULT":
      return {
        ...state,
        dsopInfo: {
          status: "RESULT",
          data: action.payload
        } as FetchDsopInfo
      };
    case "SETT_DSOP_INFO_ERROR":
      return {
        ...state,
        dsopInfo: {
          status: "ERROR",
          error: action.payload
        } as FetchDsopInfo
      };
    case "SETT_INST_INFO_RESULT":
      return {
        ...state,
        instInfo: {
          status: "RESULT",
          data: action.payload
        } as FetchInstInfo
      };
    case "SETT_INST_INFO_ERROR":
      return {
        ...state,
        instInfo: {
          status: "ERROR",
          error: action.payload
        } as FetchInstInfo
      };
    default:
      return state;
  }
};
