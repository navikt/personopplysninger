import { Adresse } from './adresse';
import { Kilde } from './kilde';

export interface DeltBosted {
    startdatoForKontrakt?: string;
    sluttdatoForKontrakt?: string;
    coAdressenavn?: string;
    kilde?: Kilde;
    adresse?: Adresse;
}
