export interface Personalia {
  fornavn?: string;
  etternavn?: string;
  personident?: {
    verdi: string;
    type: string;
  };
  kontonr?: string;
  tlfnr?: {
    jobb?: string;
    mobil?: string;
    privat?: string;
  };
  spraak?: string;
  epostadr?: string;
  personstatus?: string;
  statsborgerskap?: string;
  foedested?: string;
  sivilstand?: string;
  kjoenn?: string;
  datakilder?: {}[];
}
