import { Matrikkeladresse } from "./matrikkeladresse";
import { Veiadresse } from "./veiadresse";

export interface Boadresse {
  adresse?: string;
  adressetillegg?: string;
  bydel?: string;
  datoFraOgMed?: string;
  kommune?: string;
  land?: string;
  matrikkeladresse?: Matrikkeladresse;
  postnummer?: string;
  poststed?: string;
  veiadresse?: Veiadresse;
}
