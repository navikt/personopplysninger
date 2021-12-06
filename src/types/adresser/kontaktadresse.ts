import { Adresse } from "./adresse";

type Kilde = {
  kilde?: "freg" | "pdl";
};

export interface Kontaktadresse {
  gyldigFraOgMed?: string;
  gyldigTilOgMed?: string;
  coAdressenavn?: string;
  kilde?: Kilde;
  adresse?: Adresse;
}