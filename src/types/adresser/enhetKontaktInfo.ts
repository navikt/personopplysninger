export interface Aapning {
  dag: string;
  fra: string;
  kommentar?: string;
  stengt: boolean;
  til: string;
}

export interface Publikumsmottak {
  aapningMandag?: Aapning;
  aapningTirsdag?: Aapning;
  aapningOnsdag?: Aapning;
  aapningTorsdag?: Aapning;
  aapningFredag?: Aapning;
  aapningAndre?: Aapning[];
  gateadresse?: string;
  husbokstav?: string;
  husnummer?: string;
  postnummer?: string;
  poststed?: string;
  stedsbeskrivelse?: string;
}

export interface EnhetKontaktInfo {
  enhet: {
    publikumsmottak?: Publikumsmottak;
    spesielleopplysninger?: string;
    tlfperson?: string;
  };
}
