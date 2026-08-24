import { OptionType } from '@/types/option';

const BIC = 'BIC';

// Land der banken krever både BIC/Swift-kode og bankkode, jf. TOB-7025
const LAND_MED_KRAV_OM_BIC_OG_BANKKODE = ['AU', 'CA', 'NZ', 'ZA'];

export const harValgtBic = (bankidentifier?: string) => !!(bankidentifier && bankidentifier === BIC);

export const kreverBicOgBankkode = (land?: OptionType) => !!(land && LAND_MED_KRAV_OM_BIC_OG_BANKKODE.includes(land.value));

export const harValgtUSA = (land?: OptionType) => !!(land && land.value === 'US');

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

export const harUtfylt = (value?: string) => !!value;
