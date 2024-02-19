import { AudienceReception } from '@navikt/nav-office-reception-info';

export interface EnhetKontaktInfo {
    enhet?: Enhet;
}

export interface Enhet {
    postadresse:
        | {
              type: 'stedsadresse';
              postnummer?: string;
              poststed?: string;
              gatenavn?: string;
              husnummer?: string;
              husbokstav?: string;
          }
        | {
              type: 'postboksadresse';
              postnummer?: string;
              poststed?: string;
              postboksnummer?: string;
              postboksanlegg?: string;
          };
    publikumsmottak?: AudienceReception[];
    spesielleopplysninger?: string;
    tlfperson?: string;
}
