import { AudienceReception } from '@navikt/nav-office-reception-info';

export interface EnhetKontaktInfo {
    navn: string;
    brukerkontakt: Brukerkontakt;
}

interface Brukerkontakt {
    publikumsmottak: AudienceReception[];
}
