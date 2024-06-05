export interface InstInnslag {
    organisasjonsnummer: string;
    institusjonsnavn: string;
    institusjonstype: string;
    startdato: string;
    faktiskSluttdato: string;
    registreringstidspunkt: string;
    fiktivSluttdato: boolean;
}

export type InstInfo = InstInnslag[];
