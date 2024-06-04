import { Adresse } from './adresse';
import { Kilde } from './kilde';

export interface Oppholdsadresse {
    oppholdAnnetSted?: string;
    coAdressenavn?: string;
    kilde?: Kilde;
    adresse?: Adresse;
}
