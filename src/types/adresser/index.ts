import type { Bostedsadresse } from "./bostedsadresse";
import type { DeltBosted } from "./deltbosted";
import type { Kontaktadresse } from "./kontaktadresse";
import type { Oppholdsadresse } from "./oppholdsadresse";

export interface Adresser {
    kontaktadresser: Kontaktadresse[];
    bostedsadresse?: Bostedsadresse;
    oppholdsadresser?: Oppholdsadresse[];
    deltBosted?: DeltBosted;
}
