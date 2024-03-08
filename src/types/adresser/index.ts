import { Bostedsadresse } from './bostedsadresse';
import { Oppholdsadresse } from './oppholdsadresse';
import { DeltBosted } from './deltbosted';
import { Kontaktadresse } from './kontaktadresse';

export interface Adresser {
    kontaktadresser: Kontaktadresse[];
    bostedsadresse?: Bostedsadresse;
    oppholdsadresser?: Oppholdsadresse[];
    deltBosted?: DeltBosted;
}
