import type { Adresse } from "./adresse";
import type { Kilde } from "./kilde";

export interface Kontaktadresse {
    gyldigTilOgMed?: string;
    coAdressenavn?: string;
    kilde?: Kilde;
    adresse?: Adresse;
}
