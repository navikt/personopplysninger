import type { Adresse } from "./adresse";
import type { Kilde } from "./kilde";

export interface Oppholdsadresse {
    oppholdAnnetSted?: string;
    coAdressenavn?: string;
    kilde?: Kilde;
    adresse?: Adresse;
}
