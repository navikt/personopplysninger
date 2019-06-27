export interface Aapningstid {
  dag: string;
  fra: string;
  kommentar?: string;
  stengt: string;
  til: string;
}

export interface Publikumsmottak {
  aapningMandag?: Aapningstid;
  aapningTirsdag?: Aapningstid;
  aapningOnsdag?: Aapningstid;
  aapningTorsdag?: Aapningstid;
  aapningFredag?: Aapningstid;
  aapningAndre?: Aapningstid[];
  gateadresse?: string;
  husbokstav?: string;
  husnummer?: string;
  postnummer?: string;
  poststed?: string;
  stedsbeskrivelse?: string;
}

export interface EnhetKontaktInfo {
  enhet: {
    postadresse: {
      type: "postboksadresse" | "stedsadresse";
      postnummer?: string;
      poststed?: string;
      gatenavn?: string;
      husnummer?: string;
      husbokstav?: string;
    };
    publikumsmottak: Publikumsmottak[];
    spesielleopplysninger?: string;
    tlfperson?: string;
  };
}
