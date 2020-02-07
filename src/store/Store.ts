import { FetchKontaktInfo } from "../pages/forside/sections/4-personinfo/2-kontaktinfo/subsections/kontakt-og-reservasjonsregisteret/DKIF-Fetch";
import { PersonInfo } from "../types/personInfo";
import { KontaktInfo } from "../types/kontaktInfo";
import { HTTPError } from "../components/error/Error";
import { NameInfo } from "../types/nameInfo";
import { FetchNameInfo } from "./providers/Auth";
import { FetchFeatureToggles } from "./providers/FeatureToggles";
import { FetchDsopInfo } from "../pages/digital-samhandling-offentlig-privat/DsopFetch";
import { DsopInfo } from "../types/dsop";
import { FetchPersonInfo } from "./providers/PersonInfo";
import { InstInfo } from "../types/inst";
import { FetchInstInfo } from "../pages/institusjonsopphold/InstFetch";
import { Fetchskattetrekksmeldinger } from "../pages/skattetrekksmelding/SkattFetch";
import { FetchMedlInfo } from "../pages/medlemskap-i-folketrygden/MedlFetch";
import { MedlInfo } from "../types/medl";

export interface FeatureToggles {
  [key: string]: boolean;
}

export const initialState = {
  nameInfo: { status: "LOADING" } as FetchNameInfo,
  featureToggles: {
    status: "LOADING",
    data: {
      "personopplysninger.pdl": false,
      "personopplysninger.dsop": false,
      "personopplysninger.inst": false,
      "personopplysninger.skatt": false,
      "personopplysninger.medl": false,
      "personopplysninger.fullmakt": false,
      "personopplysninger.tilrettelegging": false,
      "pdl-fullmakt": false
    }
  } as FetchFeatureToggles,
  dsopInfo: { status: "LOADING" } as FetchDsopInfo,
  instInfo: { status: "LOADING" } as FetchInstInfo,
  personInfo: { status: "LOADING" } as FetchPersonInfo,
  kontaktInfo: { status: "LOADING" } as FetchKontaktInfo,
  skattetrekksmeldinger: { status: "LOADING" } as Fetchskattetrekksmeldinger,
  medlInfo: { status: "LOADING" } as FetchMedlInfo
};

export interface Store {
  nameInfo: FetchNameInfo;
  featureToggles: FetchFeatureToggles;
  personInfo: FetchPersonInfo;
  dsopInfo: FetchDsopInfo;
  instInfo: FetchInstInfo;
  kontaktInfo: FetchKontaktInfo;
  skattetrekksmeldinger: Fetchskattetrekksmeldinger;
  medlInfo: FetchMedlInfo;
}

export type Action =
  | {
      type: "SETT_NAME_RESULT";
      payload: NameInfo;
    }
  | {
      type: "SETT_NAME_ERROR";
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
    }
  | {
      type: "SETT_SKATT_RESULT";
      payload: InstInfo;
    }
  | {
      type: "SETT_SKATT_ERROR";
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
    case "SETT_NAME_RESULT":
      return {
        ...state,
        nameInfo: {
          status: "RESULT",
          data: action.payload
        } as FetchNameInfo
      };
    case "SETT_NAME_ERROR":
      return {
        ...state,
        nameInfo: {
          status: "ERROR",
          error: action.payload
        } as FetchNameInfo
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
    case "SETT_SKATT_RESULT":
      return {
        ...state,
        skattetrekksmeldinger: {
          status: "RESULT",
          data: action.payload
        } as Fetchskattetrekksmeldinger
      };
    case "SETT_SKATT_ERROR":
      return {
        ...state,
        skattetrekksmeldinger: {
          status: "ERROR",
          error: action.payload
        } as Fetchskattetrekksmeldinger
      };
    case "SETT_MEDL_INFO_RESULT":
      return {
        ...state,
        medlInfo: {
          status: "RESULT",
          data: action.payload
        } as FetchMedlInfo
      };
    case "SETT_MEDL_INFO_ERROR":
      return {
        ...state,
        medlInfo: {
          status: "ERROR",
          error: action.payload
        } as FetchMedlInfo
      };
    default:
      return state;
  }
};
