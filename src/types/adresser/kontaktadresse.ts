export type Kontaktadresse =
  // TPS
  | PostadresseIFrittFormat
  | UtenlandskAdresseIFrittFormat
  // PDL
  | Vegadresse
  | Postboksadresse
  | UtenlandskAdresse;

// TPS
export interface PostadresseIFrittFormat {
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

export interface UtenlandskAdresseIFrittFormat {
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
export interface Vegadresse {
  type: "VEGADRESSE";
  husnummer?: string;
  husbokstav?: string;
  bruksenhetsnummer?: string;
  adressenavn?: string;
  kommunenummer?: string;
  tilleggsnavn?: string;
  postnummer?: string;
  poststed?: string;
  gyldigFraOgMed?: string;
  gyldigTilOgMed?: string;
  coAdressenavn?: string;
}

export interface Postboksadresse {
  type: "POSTBOKSADRESSE";
  postbokseier?: string;
  postboks: string;
  postnummer?: string;
  poststed?: string;
  gyldigFraOgMed?: string;
  gyldigTilOgMed?: string;
}

export interface UtenlandskAdresse {
  type: "UTENLANDSK_ADRESSE";
  adressenavnNummer?: string;
  bygningEtasjeLeilighet?: string;
  postboksNummerNavn?: string;
  postkode?: string;
  bySted?: string;
  regionDistriktOmraade?: string;
  landkode: string;
  land: string;
  gyldigFraOgMed: string;
  gyldigTilOgMed: string;
  coAdressenavn?: string;
}
