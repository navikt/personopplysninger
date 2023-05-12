import { OptionType } from '../../../../../../types/option';

export interface OutboundNorskKontonummer {
    value: string;
}

export interface OutboundUtenlandsbankonto {
    value: string | null;
    utenlandskKontoInformasjon: {
        landkode: string;
        landkodeTobokstavs?: string;
        valuta: string;
        swift?: string;
        bank: {
            adresseLinje1?: string;
            adresseLinje2?: string;
            adresseLinje3?: string;
            kode?: string;
            navn: string;
        };
    };
}

export interface FormFields {
    kontonummer: string;
    land?: OptionType;
    valuta?: OptionType;
    banknavn: string;
    kontonummerIban: string;
    bickode: string;
    retningsnummer: string;
    bankkode: string;
    adresse1: string;
    adresse2: string;
    adresse3: string;
}
