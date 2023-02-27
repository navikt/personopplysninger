import React from "react";
import PostadresseIFrittFormat from "./adressetyper/norske-adresser/PostadresseIFrittFormat";
import UtenlanskAdresseIFrittFormat from "./adressetyper/utenlanske-adresser/UtenlanskAdresseIFrittFormat";
import Vegadresse from "./adressetyper/norske-adresser/Vegadresse";
import Postboksadresse from "./adressetyper/norske-adresser/Postboksadresse";
import UtenlanskAdresse from "./adressetyper/utenlanske-adresser/UtenlanskAdresse";
import AdressePanel from "../komponenter/AdressePanel";
import Matrikkeladresse from "./adressetyper/norske-adresser/Matrikkeladresse";
import Ukjentbosted from "./adressetyper/norske-adresser/Ukjentbosted";
import { Adresse as IAdresse } from "types/adresser/adresse";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";

interface Props {
  adresse?: IAdresse;
  coAdressenavn?: string;
  gyldigTilOgMed?: string;
  angittFlyttedato?: string;
  oppholdAnnetSted?: string;
  tittel: string;
}

const Adresse = (props: Props) => {
  if (props.adresse == null && props.oppholdAnnetSted != null) {
    return (
      <AdressePanel tittel={props.tittel}>
        <FormattedMessage
          id={mapOppholdAnnetSted(props.oppholdAnnetSted)}
        />
      </AdressePanel>
    );
  }

  const gyldigTilOgMed = props.gyldigTilOgMed;
  const gyldigTilOgMedFormatert = gyldigTilOgMed
    ? dayjs(gyldigTilOgMed).format("DD.MM.YYYY")
    : "";

  const flyttedato = props.angittFlyttedato;
  const flyttedatoFormatert = flyttedato
    ? dayjs(flyttedato).format("DD.MM.YYYY")
    : "";

  let adresse;
  let kommune;
  let bruksenhetsnummer;

  switch (props.adresse?.type) {
    case "POSTADRESSE_I_FRITT_FORMAT":
      adresse = <PostadresseIFrittFormat {...props.adresse} />;
      break;
    case "UTENLANDSK_ADRESSE_I_FRITT_FORMAT":
      adresse = <UtenlanskAdresseIFrittFormat {...props.adresse} />;
      break;
    case "VEGADRESSE":
      adresse = (
        <Vegadresse {...props.adresse} coAdressenavn={props.coAdressenavn} />
      );
      kommune = props.adresse?.kommune;
      bruksenhetsnummer = props.adresse?.bruksenhetsnummer;
      break;
    case "POSTBOKSADRESSE":
      adresse = (
        <Postboksadresse
          {...props.adresse}
          coAdressenavn={props.coAdressenavn}
        />
      );
      break;
    case "UTENLANDSK_ADRESSE":
      adresse = (
        <UtenlanskAdresse
          {...props.adresse}
          coAdressenavn={props.coAdressenavn}
        />
      );
      break;
    case "MATRIKKELADRESSE":
      adresse = (
        <Matrikkeladresse
          {...props.adresse}
          coAdressenavn={props.coAdressenavn}
          bruksenhetsnummer={""}
        />
      );
      kommune = props.adresse?.kommune;
      bruksenhetsnummer = props.adresse?.bruksenhetsnummer;
      break;
    case "UKJENTBOSTED":
      adresse = (
        <Ukjentbosted {...props.adresse} coAdressenavn={props.coAdressenavn} />
      );
      break;
    default:
      return null;
  }

  return (
    <AdressePanel
      tittel={props.tittel}
      bruksenhetsnummer={bruksenhetsnummer}
      kommune={kommune}
      gyldigTilOgMedFormatert={gyldigTilOgMedFormatert}
      flyttedatoFormatert={flyttedatoFormatert}
    >
      {adresse}
    </AdressePanel>
  );
};

function mapOppholdAnnetSted(oppholdAnnetSted: string): string {
  switch (oppholdAnnetSted) {
    case "MILITAER":
      return "adresse.oppholdsadresse.militaer";
    case "UTENRIKS":
      return "adresse.oppholdsadresse.utenriks";
    case "PAA_SVALBARD":
      return "adresse.oppholdsadresse.paasvalbard";
    case "PENDLER":
      return "adresse.oppholdsadresse.pendler";
  }
  return oppholdAnnetSted; // Bruk kode direkte som fallback
}

export default Adresse;
