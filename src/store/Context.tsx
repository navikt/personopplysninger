import React, { createContext, useContext, useReducer, Dispatch } from "react";
import { Action, Locale, reducer, Store } from "./Store";
import { FetchNameInfo } from "./providers/Auth";
import { FetchFeatureToggles } from "./providers/FeatureToggles";
import { FetchDsopInfo } from "../pages/digital-samhandling-offentlig-privat/DsopFetch";
import { FetchInstInfo } from "../pages/institusjonsopphold/InstFetch";
import { FetchPersonInfo } from "./providers/PersonInfo";
import { FetchKontaktInfo } from "../pages/forside/sections/4-personinfo/2-kontaktinfo/subsections/kontakt-og-reservasjonsregisteret/DKIF-Fetch";
import { Fetchskattetrekksmeldinger } from "../pages/skattetrekksmelding/SkattFetch";
import { FetchMedlInfo } from "../pages/medlemskap-i-folketrygden/MedlFetch";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const StoreContext = createContext({} as [Store, Dispatch<Action>]);
export const StoreProvider = (props: Props) => {
  const { children } = props;

  const initialLocale = (window.location.pathname.includes("/en")
    ? "en"
    : "nb") as Locale;

  const initialState = {
    locale: initialLocale,
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
        "pdl-fullmakt": false,
      },
    } as FetchFeatureToggles,
    dsopInfo: { status: "LOADING" } as FetchDsopInfo,
    instInfo: { status: "LOADING" } as FetchInstInfo,
    personInfo: { status: "LOADING" } as FetchPersonInfo,
    kontaktInfo: { status: "LOADING" } as FetchKontaktInfo,
    skattetrekksmeldinger: { status: "LOADING" } as Fetchskattetrekksmeldinger,
    medlInfo: { status: "LOADING" } as FetchMedlInfo,
  };

  return (
    <StoreContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StoreContext.Provider>
  );
};
export const useStore = () => useContext(StoreContext);
