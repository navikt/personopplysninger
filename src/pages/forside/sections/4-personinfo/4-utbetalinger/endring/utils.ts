import { OptionType } from "types/option";
import { Fields } from "calidation";
import {
  LAND_MED_BANKKODE,
  BIC,
} from "./utenlandsk-bankkonto/UtenlandsBankkonto";

import { LandOppslag } from "./landOppslag";

export const getCountryAlpha2 = (countryCode: string) =>
  LandOppslag.has(countryCode) ? LandOppslag.get(countryCode)?.alpha2 : "";

export const getIbanPrefixAlternatives = (countryCode: string): string[] => {
  return LandOppslag.has(countryCode)
    ? LandOppslag.get(countryCode)?.ibanPrefixAlternatives || []
    : [];
};

export const harValgtBic = (bankidentifier?: string) =>
  !!(bankidentifier && bankidentifier === BIC);

export const harValgtUSA = (land?: OptionType) =>
  !!(land && land.value === "USA");

export const brukerBankkode = (land?: OptionType) =>
  !!(land && LAND_MED_BANKKODE.includes(land.value));

export const validerBic = (fields: Fields) => {
  if (harValgtUSA(fields.land)) {
    return false;
  }

  if (brukerBankkode(fields.land)) {
    if (harUtfylt(fields.bickode) || !harUtfylt(fields.bankkode)) {
      return true;
    }
  }

  if (!brukerBankkode(fields.land)) {
    return true;
  }

  return false;
};

export const validerBankkode = (fields: Fields) => {
  if (harValgtUSA(fields.land)) {
    return true;
  }

  if (brukerBankkode(fields.land)) {
    if (harUtfylt(fields.bankkode) || !harUtfylt(fields.bickode)) {
      return true;
    }
  }

  return false;
};

export const harUtfylt = (value?: string) => (value ? true : false);

export const erLandIEuropa = (land: OptionType): boolean => {
  if (!land) {
    return false;
  }
  return !!(
    LandOppslag.has(land.value) && LandOppslag.get(land.value)?.isEurope
  );
};
