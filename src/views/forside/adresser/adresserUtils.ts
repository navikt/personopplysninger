import type { Language } from "@/language/language";
import type { Kontaktadresse } from "@/types/adresser/kontaktadresse";
import { text } from "./adresserText";

const utenlandskeAdressetyper = ["UTENLANDSK_ADRESSE", "UTENLANDSK_ADRESSE_I_FRITT_FORMAT"];

const isUtenlandsk = (adresse: Kontaktadresse) => !!adresse.adresse?.type && utenlandskeAdressetyper.includes(adresse.adresse.type);

export const kontaktadresseTittel = (adresse: Kontaktadresse, kontaktadresser: Kontaktadresse[], language: Language) => {
    if (isUtenlandsk(adresse)) {
        return text.kontaktadresseUtenlandsk[language];
    }

    if (kontaktadresser.some(isUtenlandsk)) {
        return text.kontaktadresseNorsk[language];
    }

    return text.kontaktadresse[language];
};

export const oppholdAnnetStedTekst = (oppholdAnnetSted: string, language: Language) => {
    switch (oppholdAnnetSted) {
        case "MILITAER":
            return text.militaer[language];
        case "UTENRIKS":
            return text.utenriks[language];
        case "PAA_SVALBARD":
            return text.paaSvalbard[language];
        case "PENDLER":
            return text.pendler[language];
    }

    return oppholdAnnetSted;
};
