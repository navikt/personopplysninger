export interface Aapningstid {
  dag: string;
  dato: string;
  fra: string;
  kommentar?: string;
  stengt: string;
  til: string;
}

export interface Publikumsmottak {
  aapningstider: Aapningstid[];
  spesielleAapningstider: Aapningstid[];
  gateadresse?: string;
  husbokstav?: string;
  husnummer?: string;
  postnummer?: string;
  poststed?: string;
  stedsbeskrivelse?: string;
}

export interface EnhetKontaktInfo {
  enhet?: Enhet;
}

export interface Enhet {
  postadresse:
    | {
        type: "stedsadresse";
        postnummer?: string;
        poststed?: string;
        gatenavn?: string;
        husnummer?: string;
        husbokstav?: string;
      }
    | {
        type: "postboksadresse";
        postnummer?: string;
        poststed?: string;
        postboksnummer?: string;
        postboksanlegg?: string;
      };
  publikumsmottak?: Publikumsmottak[];
  spesielleopplysninger?: string;
  tlfperson?: string;
}
