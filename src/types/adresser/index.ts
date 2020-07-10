import { Boadresse } from "./boadresse";
import { Postadresse } from "./postadresse";
import { Tilleggsadresse } from "./tilleggsadresse";
import { UtenlandskAdresse } from "./utenlandskadresse";
import { Kontaktadresse } from "./kontaktadresse";

export interface GeografiskTilknytning {
  bydel?: string;
  datoFraOgMed?: string;
  kommune?: string;
  enhet?: string;
  land?: string;
}

export interface Adresser {
  boadresse?: Boadresse;
  geografiskTilknytning?: GeografiskTilknytning;
  postadresse?: Postadresse;
  prioritertAdresse?: string;
  kontaktadresse: Kontaktadresse;
  datakilder?: {}[];
}
