export interface skattetrekksmelding {
  organisasjonsnummer: string;
  institusjonsnavn: string;
  institusjonstype: string;
  kategori: string;
  startdato: string;
  faktiskSluttdato: string;
  registreringstidspunkt: string;
}

export type skattetrekksmeldinger = skattetrekksmelding[];
