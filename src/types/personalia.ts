export interface Tlfnr {
  telefonHoved?: string;
  telefonAlternativ?: string;
  landskodeHoved?: string;
  landskodeAlternativ?: string;
}

export interface UtenlandskBankkonto {
  adresse1: string;
  adresse2: string;
  adresse3: string;
  bankkode: string;
  banknavn: string;
  iban: string;
  kontonummer: string;
  land: string;
  swiftkode: string;
  valuta: string;
}

export interface Personalia {
  fornavn?: string;
  etternavn?: string;
  personident?: {
    verdi: string;
    type: string;
  };
  kontonr?: string;
  kontoregisterError: boolean;
  utenlandskbank: UtenlandskBankkonto;
  tlfnr?: Tlfnr;
  spraak?: string;
  epostadr?: string;
  personstatus?: string;
  statsborgerskap?: string[];
  foedested?: string;
  sivilstand?: string;
  kjoenn?: string;
  datakilder?: {}[];
}
