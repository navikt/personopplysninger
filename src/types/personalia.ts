export interface Tlfnr {
  jobb?: string;
  mobil?: string;
  privat?: string;
}

export interface Personalia {
  fornavn?: string;
  etternavn?: string;
  personident?: {
    verdi: string;
    type: string;
  };
  kontonr?: string;
  tlfnr?: Tlfnr;
  spraak?: string;
  epostadr?: string;
  personstatus?: string;
  statsborgerskap?: string;
  foedested?: string;
  sivilstand?: string;
  kjoenn?: string;
  datakilder?: {}[];
}
