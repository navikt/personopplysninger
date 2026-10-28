import type { OptionType } from "@/types/option";

const LAND_MED_KRAV_OM_BIC_OG_BANKKODE = ["AU", "CA", "NZ", "ZA"];

export const kreverBicOgBankkode = (land?: OptionType) => !!(land && LAND_MED_KRAV_OM_BIC_OG_BANKKODE.includes(land.value));

export const harValgtUSA = (land?: OptionType) => !!(land && land.value === "US");

export const brukerBankkode = (land?: OptionType) => !!(land && land.bankkodeLengde);

export const validerBic = (land?: OptionType, bickode?: string, bankkode?: string) => {
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

export const validerBankkode = (land?: OptionType, bickode?: string, bankkode?: string) => {
    if (harValgtUSA(land)) {
        return true;
    }

    if (brukerBankkode(land)) {
        return harUtfylt(bankkode) || !harUtfylt(bickode);
    }

    return false;
};

const harUtfylt = (value?: string) => !!value;
