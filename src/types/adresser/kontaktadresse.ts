import { Adresse } from "./adresse";

export interface Kontaktadresse {
  gyldigFraOgMed?: string;
  gyldigTilOgMed?: string;
  coAdressenavn?: string;
  kilde?: string;
  adresse?: Adresse;
}