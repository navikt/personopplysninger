import { FetchKontaktInfo } from '../pages/forside/sections/4-personinfo/2-kontaktinfo/subsections/kontakt-og-reservasjonsregisteret/DKIF-Fetch';
import { PersonInfo } from '../types/personInfo';
import { KontaktInfo } from '../types/kontaktInfo';
import { HTTPError } from '../components/error/Error';
import { FetchFeatureToggles } from './providers/FeatureToggles';
import { FetchDsopInfo } from '../pages/digital-samhandling-offentlig-privat/DsopFetch';
import { DsopInfo } from '../types/dsop';
import { FetchPersonInfo } from './providers/PersonInfo';
import { InstInfo } from '../types/inst';
import { FetchInstInfo } from '../pages/institusjonsopphold/InstFetch';
import { FetchMedlInfo } from '../pages/medlemskap-i-folketrygden/MedlFetch';
import { MedlInfo } from '../types/medl';
import { Auth, FetchAuth } from '../types/authInfo';

export interface FeatureToggles {
    [key: string]: boolean;
}

const initialLocale = ((window.location.pathname.match(/\/en($|\/)/) && 'en') ||
    (window.location.pathname.match(/\/nn($|\/)/) && 'nn') ||
    'nb') as Locale;

export const initialState = {
    formKey: 0,
    locale: initialLocale,
    authInfo: { status: 'LOADING' } as FetchAuth,
    featureToggles: {
        status: 'LOADING',
        data: {
            'personopplysninger.pdl': false,
            'personopplysninger.dsop': false,
            'personopplysninger.inst': false,
            'personopplysninger.skatt': false,
            'personopplysninger.medl': false,
            'personopplysninger.fullmakt': false,
            'pdl-fullmakt': false,
        },
    } as FetchFeatureToggles,
    dsopInfo: { status: 'LOADING' } as FetchDsopInfo,
    instInfo: { status: 'LOADING' } as FetchInstInfo,
    personInfo: { status: 'LOADING' } as FetchPersonInfo,
    kontaktInfo: { status: 'LOADING' } as FetchKontaktInfo,
    medlInfo: { status: 'LOADING' } as FetchMedlInfo,
};
export type Locale = 'nb' | 'en' | 'nn';

export interface Store {
    formKey: number;
    locale: Locale;
    authInfo: FetchAuth;
    featureToggles: FetchFeatureToggles;
    personInfo: FetchPersonInfo;
    dsopInfo: FetchDsopInfo;
    instInfo: FetchInstInfo;
    kontaktInfo: FetchKontaktInfo;
    medlInfo: FetchMedlInfo;
}

export type Action =
    | {
          type: 'SETT_LOCALE';
          payload: Locale;
      }
    | {
          type: 'SETT_AUTH_RESULT';
          payload: Auth;
      }
    | {
          type: 'SETT_AUTH_ERROR';
          payload: HTTPError;
      }
    | {
          type: 'SETT_FEATURE_TOGGLES';
          payload: FeatureToggles;
      }
    | {
          type: 'SETT_PERSON_INFO_RESULT';
          payload: PersonInfo;
      }
    | {
          type: 'SETT_PERSON_INFO_ERROR';
          payload: HTTPError;
      }
    | {
          type: 'SETT_KONTAKT_INFO_RESULT';
          payload: KontaktInfo;
      }
    | {
          type: 'SETT_KONTAKT_INFO_ERROR';
          payload: HTTPError;
      }
    | {
          type: 'SETT_DSOP_INFO_RESULT';
          payload: DsopInfo;
      }
    | {
          type: 'SETT_DSOP_INFO_ERROR';
          payload: HTTPError;
      }
    | {
          type: 'SETT_INST_INFO_RESULT';
          payload: InstInfo;
      }
    | {
          type: 'SETT_INST_INFO_ERROR';
          payload: HTTPError;
      }
    | {
          type: 'SETT_SKATT_ERROR';
          payload: HTTPError;
      }
    | {
          type: 'SETT_MEDL_INFO_RESULT';
          payload: MedlInfo;
      }
    | {
          type: 'SETT_MEDL_INFO_ERROR';
          payload: HTTPError;
      }
    | {
          type: 'INCREASE_FORM_KEY';
      };

export const reducer = (state: Store, action: Action) => {
    switch (action.type) {
        case 'SETT_LOCALE':
            return {
                ...state,
                locale: action.payload,
            };
        case 'SETT_AUTH_RESULT':
            return {
                ...state,
                authInfo: {
                    status: 'RESULT',
                    data: action.payload,
                } as FetchAuth,
            };
        case 'SETT_AUTH_ERROR':
            return {
                ...state,
                authInfo: {
                    status: 'ERROR',
                    error: action.payload,
                } as FetchAuth,
            };
        case 'SETT_FEATURE_TOGGLES':
            return {
                ...state,
                featureToggles: {
                    status: 'RESULT',
                    data: action.payload,
                } as FetchFeatureToggles,
            };
        case 'SETT_PERSON_INFO_RESULT':
            return {
                ...state,
                personInfo: {
                    status: 'RESULT',
                    data: action.payload,
                } as FetchPersonInfo,
            };
        case 'SETT_PERSON_INFO_ERROR':
            return {
                ...state,
                personInfo: {
                    status: 'ERROR',
                    error: action.payload,
                } as FetchPersonInfo,
            };
        case 'SETT_KONTAKT_INFO_RESULT':
            return {
                ...state,
                kontaktInfo: {
                    status: 'RESULT',
                    data: action.payload,
                } as FetchKontaktInfo,
            };
        case 'SETT_KONTAKT_INFO_ERROR':
            return {
                ...state,
                kontaktInfo: {
                    status: 'ERROR',
                    error: action.payload,
                } as FetchKontaktInfo,
            };
        case 'SETT_DSOP_INFO_RESULT':
            return {
                ...state,
                dsopInfo: {
                    status: 'RESULT',
                    data: action.payload,
                } as FetchDsopInfo,
            };
        case 'SETT_DSOP_INFO_ERROR':
            return {
                ...state,
                dsopInfo: {
                    status: 'ERROR',
                    error: action.payload,
                } as FetchDsopInfo,
            };
        case 'SETT_INST_INFO_RESULT':
            return {
                ...state,
                instInfo: {
                    status: 'RESULT',
                    data: action.payload,
                } as FetchInstInfo,
            };
        case 'SETT_INST_INFO_ERROR':
            return {
                ...state,
                instInfo: {
                    status: 'ERROR',
                    error: action.payload,
                } as FetchInstInfo,
            };
        case 'SETT_MEDL_INFO_RESULT':
            return {
                ...state,
                medlInfo: {
                    status: 'RESULT',
                    data: action.payload,
                } as FetchMedlInfo,
            };
        case 'SETT_MEDL_INFO_ERROR':
            return {
                ...state,
                medlInfo: {
                    status: 'ERROR',
                    error: action.payload,
                } as FetchMedlInfo,
            };
        case 'INCREASE_FORM_KEY':
            return {
                ...state,
                formKey: state.formKey + 1,
            };
        default:
            return state;
    }
};
