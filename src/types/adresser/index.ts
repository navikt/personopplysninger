import { Boadresse } from "./boadresse";
import { Postadresse } from "./postadresse";
import { Tilleggsadresse } from "./tilleggsadresse";
import { UtenlandskAdresse } from "./utenlandskadresse";

export interface GeografiskTilknytning {
  bydel?: string;
  datoFraOgMed?: string;
  kommune?: string;
  land?: string;
}

export interface Adresser {
  boadresse?: Boadresse;
  geografiskTilknytning?: GeografiskTilknytning;
  postadresse?: Postadresse;
  prioritertAdresse?: string;
  tilleggsadresse?: Tilleggsadresse;
  utenlandskAdresse?: UtenlandskAdresse;
  datakilder?: {}[];
}
