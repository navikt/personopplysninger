import { Adresse } from "./adresse";

export interface Bostedsadresse {
  angittFlyttedato?: string;
  gyldigFraOgMed?: string;
  gyldigTilOgMed?: string;
  coAdressenavn?: string;
  adresse?: Adresse;
}
