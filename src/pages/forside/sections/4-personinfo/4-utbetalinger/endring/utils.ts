import { OptionType } from "types/option";
import { Fields } from "calidation";
import {
  BIC,
  IBAN_PREFIX_ALTERNATIVES,
} from "./utenlandsk-bankkonto/UtenlandsBankkonto";

export const getIbanPrefixAlternatives = (countryCode: string): string[] => {
  return IBAN_PREFIX_ALTERNATIVES[countryCode] || [];
};

export const harValgtBic = (bankidentifier?: string) =>
  !!(bankidentifier && bankidentifier === BIC);

export const harValgtUSA = (land?: OptionType) =>
  !!(land && land.value === "US");

export const brukerBankkode = (land?: OptionType) =>
  !!(land && land.bankkodeLengde);

export const validerBic = (fields: Fields) => {
  if (harValgtUSA(fields.land)) {
    return false;
  }

  if (brukerBankkode(fields.land)) {
    if (harUtfylt(fields.bickode) || !harUtfylt(fields.bankkode)) {
      return true;
    }
  }

  return !brukerBankkode(fields.land);
};

export const validerBankkode = (fields: Fields) => {
  if (harValgtUSA(fields.land)) {
    return true;
  }

  if (brukerBankkode(fields.land)) {
    return harUtfylt(fields.bankkode) || !harUtfylt(fields.bickode);
  }

  return false;
};

export const harUtfylt = (value?: string) => !!value;
