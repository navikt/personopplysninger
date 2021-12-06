import { Adresse } from "./adresse";

export interface Oppholdsadresse {
  oppholdAnnetSted?: string;
  gyldigFraOgMed?: string;
  gyldigTilOgMed?: string;
  coAdressenavn?: string;
  adresse?: Adresse;
}
