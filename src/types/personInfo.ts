import { Personalia } from "./personalia";
import { Adresser } from "./adresser";
import { EnhetKontaktInfo } from "./enhetKontaktInfo";

export interface PersonInfo {
  personalia?: Personalia;
  adresser?: Adresser;
  enhetKontaktInformasjon?: EnhetKontaktInfo;
}
