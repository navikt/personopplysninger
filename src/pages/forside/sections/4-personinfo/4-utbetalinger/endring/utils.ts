import { OptionType } from "types/option";
import { Fields } from "calidation";
import {
  BIC,
  LAND_MED_BANKKODE,
} from "./utenlandsk-bankkonto/UtenlandsBankkonto";

import { LandOppslag } from "./landOppslag";

export const getIbanPrefixAlternatives = (countryCode: string): string[] => {
  return LandOppslag.has(countryCode)
    ? LandOppslag.get(countryCode)?.ibanPrefixAlternatives || []
    : [];
};

export const harValgtBic = (bankidentifier?: string) =>
  !!(bankidentifier && bankidentifier === BIC);

export const harValgtUSA = (land?: OptionType) =>
  !!(land && land.value === "US");

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
    return harUtfylt(fields.bankkode) || !harUtfylt(fields.bickode);
  }

  return false;
};

export const harUtfylt = (value?: string) => !!value;

export const erLandIEuropa = (land: OptionType): boolean => {
  if (!land) {
    return false;
  }
  return !!(
    LandOppslag.has(land.value) && LandOppslag.get(land.value)?.isEurope
  );
};
