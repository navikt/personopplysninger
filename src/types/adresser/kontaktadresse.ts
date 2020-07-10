export type Kontaktadresse =
  // TPS
  | NorskPostadresseIFrittFormat
  | UtenlanskAdresseIFrittFormat
  // PDL
  | NorskVegadresse
  | NorskPostboksadresse
  | UtenlanskAdresse;

// TPS
export interface NorskPostadresseIFrittFormat {
  type: "POSTADRESSE_I_FRITT_FORMAT";
  adresselinje1?: string;
  adresselinje2?: string;
  adresselinje3?: string;
  postnummer?: string;
  poststed?: string;
  gyldigFraOgMed?: string;
  gyldigTilOgMed?: string;
  coAdressenavn?: string;
}

export interface UtenlanskAdresseIFrittFormat {
  type: "UTENLANDSK_ADRESSE_I_FRITT_FORMAT";
  adresselinje1?: string;
  adresselinje2?: string;
  adresselinje3?: string;
  postkode?: string;
  byEllerStedsnavn?: string;
  landkode?: String;
  land?: string;
  gyldigFraOgMed?: string;
  gyldigTilOgMed?: string;
  coAdressenavn?: string;
}

// PDL
export interface NorskVegadresse {
  type: "VEGADRESSE";
  husnummer?: string;
  husbokstav?: string;
  bruksenhetsnummer?: string;
  adressenavn: string;
  kommunenummer?: string;
  tilleggsnavn?: string;
  postnummer: string;
  gyldigFraOgMed: string;
  gyldigTilOgMed: string;
  coAdressenavn?: string;
}

export interface NorskPostboksadresse {
  type: "POSTBOKSADRESSE";
  postbokseier: string;
  postboks: string;
  postnummer: string;
  gyldigFraOgMed: string;
  gyldigTilOgMed: string;
}

export interface UtenlanskAdresse {
  type: "UTENLANDSK_ADRESSE";
  adressenavnNummer?: string;
  bygningEtasjeLeilighet?: string;
  postboksNummerNavn?: string;
  postkode?: string;
  bySted?: string;
  regionDistriktOmraade?: string;
  landkode: string;
  gyldigFraOgMed: string;
  gyldigTilOgMed: string;
  coAdressenavn?: string;
}
