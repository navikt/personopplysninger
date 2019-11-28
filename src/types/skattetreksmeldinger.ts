export interface Skattetreksmelding {
  organisasjonsnummer: string;
  institusjonsnavn: string;
  institusjonstype: string;
  kategori: string;
  startdato: string;
  faktiskSluttdato: string;
  registreringstidspunkt: string;
}

export type Skattetreksmeldinger = Skattetreksmelding[];
