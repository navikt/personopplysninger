import { Bostedsadresse } from "./bostedsadresse";
import { Oppholdsadresse } from "./oppholdsadresse";
import { DeltBosted } from "./deltbosted";
import { Kontaktadresse } from "./kontaktadresse";

export interface GeografiskTilknytning {
  bydel?: string;
  kommune?: string;
  enhet?: string;
  land?: string;
}

export interface Adresser {
  geografiskTilknytning?: GeografiskTilknytning;
  kontaktadresser: Kontaktadresse[];
  bostedsadresse?: Bostedsadresse;
  oppholdsadresse?: Oppholdsadresse;
  deltBosted?: DeltBosted;
}
