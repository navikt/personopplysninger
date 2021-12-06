import { Adresse } from "./adresse";

export interface DeltBosted {
  startdatoForKontrakt?: string;
  sluttdatoForKontrakt?: string;
  coAdressenavn?: string;
  adresse?: Adresse;
}
