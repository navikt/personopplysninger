import { OptionType } from "types/option";

const BIC = "BIC";

export const harValgtBic = (bankidentifier?: string) =>
  !!(bankidentifier && bankidentifier === BIC);

export const harValgtUSA = (land?: OptionType) =>
  !!(land && land.value === "US");

export const brukerBankkode = (land?: OptionType) =>
  !!(land && land.bankkodeLengde);

export const validerBic = (
  land?: OptionType,
  bickode?: string,
  bankkode?: string
) => {
  if (harValgtUSA(land)) {
    return false;
  }

  if (brukerBankkode(land)) {
    if (harUtfylt(bickode) || !harUtfylt(bankkode)) {
      return true;
    }
  }

  return !brukerBankkode(land);
};

export const validerBankkode = (
  land?: OptionType,
  bickode?: string,
  bankkode?: string
) => {
  if (harValgtUSA(land)) {
    return true;
  }

  if (brukerBankkode(land)) {
    return harUtfylt(bankkode) || !harUtfylt(bickode);
  }

  return false;
};

export const harUtfylt = (value?: string) => !!value;
