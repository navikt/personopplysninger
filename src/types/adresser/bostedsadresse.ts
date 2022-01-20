import { Adresse } from "./adresse";
import { Kilde } from "./kilde";

export interface Bostedsadresse {
  angittFlyttedato?: string;
  gyldigFraOgMed?: string;
  gyldigTilOgMed?: string;
  coAdressenavn?: string;
  kilde?: Kilde;
  adresse?: Adresse;
}
