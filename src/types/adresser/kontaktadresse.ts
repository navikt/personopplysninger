import { Adresse } from './adresse';
import { Kilde } from './kilde';

export interface Kontaktadresse {
    gyldigFraOgMed?: string;
    gyldigTilOgMed?: string;
    coAdressenavn?: string;
    kilde?: Kilde;
    adresse?: Adresse;
}
