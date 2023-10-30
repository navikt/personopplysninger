import { Adresse } from './adresse';
import { Kilde } from './kilde';

export interface Oppholdsadresse {
    oppholdAnnetSted?: string;
    gyldigFraOgMed?: string;
    gyldigTilOgMed?: string;
    coAdressenavn?: string;
    kilde?: Kilde;
    adresse?: Adresse;
}
