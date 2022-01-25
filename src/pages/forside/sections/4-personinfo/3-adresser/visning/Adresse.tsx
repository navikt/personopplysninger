import React from "react";
import PostadresseIFrittFormat from "./adressetyper/norske-adresser/PostadresseIFrittFormat";
import UtenlanskAdresseIFrittFormat from "./adressetyper/utenlanske-adresser/UtenlanskAdresseIFrittFormat";
import Vegadresse from "./adressetyper/norske-adresser/Vegadresse";
import Postboksadresse from "./adressetyper/norske-adresser/Postboksadresse";
import UtenlanskAdresse from "./adressetyper/utenlanske-adresser/UtenlanskAdresse";
import AdressePanel from "../komponenter/AdressePanel";
import moment from "moment";
import Matrikkeladresse from "./adressetyper/norske-adresser/Matrikkeladresse";
import Ukjentbosted from "./adressetyper/norske-adresser/Ukjentbosted";
import { Adresse as IAdresse } from "../../../../../../types/adresser/adresse";
import { Normaltekst } from "nav-frontend-typografi";

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
        <Normaltekst>{props.oppholdAnnetSted}</Normaltekst>
      </AdressePanel>
    );
  }

  const gyldigTilOgMed = props.gyldigTilOgMed;
  const gyldigTilOgMedFormatert = gyldigTilOgMed ? moment(gyldigTilOgMed).format("L") : "";

  const flyttedato = props.angittFlyttedato;
  const flyttedatoFormatert = flyttedato ? moment(flyttedato).format("L") : "";

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
      adresse = <Vegadresse {...props.adresse} coAdressenavn={props.coAdressenavn}/>;
      kommune = props.adresse?.kommune;
      bruksenhetsnummer = props.adresse?.bruksenhetsnummer;
      break;
    case "POSTBOKSADRESSE":
      adresse = <Postboksadresse {...props.adresse} coAdressenavn={props.coAdressenavn}/>;
      break;
    case "UTENLANDSK_ADRESSE":
      adresse = <UtenlanskAdresse {...props.adresse} coAdressenavn={props.coAdressenavn}/>;
      break;
    case "MATRIKKELADRESSE":
      adresse = <Matrikkeladresse {...props.adresse}
                                  coAdressenavn={props.coAdressenavn}
                                  bruksenhetsnummer={""}/>;
      kommune = props.adresse?.kommune;
      bruksenhetsnummer = props.adresse?.bruksenhetsnummer;
      break;
    case "UKJENTBOSTED":
      adresse = <Ukjentbosted {...props.adresse} coAdressenavn={props.coAdressenavn}/>;
      break;
    default:
      return null;
  }

  return (
    <AdressePanel tittel={props.tittel}
                  bruksenhetsnummer={bruksenhetsnummer}
                  kommune={kommune}
                  gyldigTilOgMedFormatert={gyldigTilOgMedFormatert}
                  flyttedatoFormatert={flyttedatoFormatert}>
      {adresse}
    </AdressePanel>
  );
};

export default Adresse;
