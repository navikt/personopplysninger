import React from "react";
import { Kontaktadresse as IKontaktadresse } from "types/adresser/kontaktadresse";
import PostadresseIFrittFormat from "../adressetyper/norske-adresser/PostadresseIFrittFormat";
import UtenlanskAdresseIFrittFormat from "../adressetyper/utenlanske-adresser/UtenlanskAdresseIFrittFormat";
import Vegadresse from "../adressetyper/norske-adresser/Vegadresse";
import Postboksadresse from "../adressetyper/norske-adresser/Postboksadresse";
import UtenlanskAdresse from "../adressetyper/utenlanske-adresser/UtenlanskAdresse";
import AdressePanel from "../../komponenter/AdressePanel";

interface Props {
  kontaktadresse: IKontaktadresse;
}

const Kontaktadresse = (props: Props) => {

  let adresse;

  switch (props.kontaktadresse?.adresse?.type) {
    case "POSTADRESSE_I_FRITT_FORMAT":
      adresse = <PostadresseIFrittFormat {...props.kontaktadresse?.adresse} coAdressenavn={props.kontaktadresse?.coAdressenavn } />;
      break;
    case "UTENLANDSK_ADRESSE_I_FRITT_FORMAT":
      adresse = <UtenlanskAdresseIFrittFormat {...props.kontaktadresse?.adresse} coAdressenavn={props.kontaktadresse?.coAdressenavn } />;
      break;
    case "VEGADRESSE":
      adresse = <Vegadresse {...props.kontaktadresse?.adresse} coAdressenavn={props.kontaktadresse?.coAdressenavn } />;
      break;
    case "POSTBOKSADRESSE":
      adresse = <Postboksadresse {...props.kontaktadresse?.adresse} coAdressenavn={props.kontaktadresse?.coAdressenavn } />;
      break;
    case "UTENLANDSK_ADRESSE":
      adresse = <UtenlanskAdresse {...props.kontaktadresse?.adresse} coAdressenavn={props.kontaktadresse?.coAdressenavn } />;
      break;
    default:
      return null;
  }

  return (
      <AdressePanel tittel={"adresse.kontaktadresse"}>
        <>
          {adresse}
        </>
      </AdressePanel>
  );
};

export default Kontaktadresse;
