import type { Adresser } from "./adresser";
import type { EnhetKontaktInfo } from "./enhetKontaktInfo";
import type { Personalia } from "./personalia";

export interface PersonInfo {
    personalia?: Personalia;
    adresser?: Adresser;
    enhetKontaktInformasjon?: EnhetKontaktInfo;
}
