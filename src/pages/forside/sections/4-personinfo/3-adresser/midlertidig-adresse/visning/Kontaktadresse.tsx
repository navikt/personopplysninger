import React from "react";
import { Kontaktadresse as IKontaktadresse } from "types/adresser/kontaktadresse";
import PostadresseIFrittFormat from "./norske-adresser/PostadresseIFrittFormat";
import UtenlanskAdresseIFrittFormat from "./utenlanske-adresser/UtenlanskAdresseIFrittFormat";
import Vegadresse from "./norske-adresser/Vegadresse";
import Postboksadresse from "./norske-adresser/Postboksadresse";
import UtenlanskAdresse from "./utenlanske-adresser/UtenlanskAdresse";

interface Props {
  kontaktadresse: IKontaktadresse;
}

const Kontaktadresse = (props: Props) => {
  switch (props.kontaktadresse.type) {
    case "POSTADRESSE_I_FRITT_FORMAT":
      return <PostadresseIFrittFormat {...props.kontaktadresse} />;
    case "UTENLANDSK_ADRESSE_I_FRITT_FORMAT":
      return <UtenlanskAdresseIFrittFormat {...props.kontaktadresse} />;
    case "VEGADRESSE":
      return <Vegadresse {...props.kontaktadresse} />;
    case "POSTBOKSADRESSE":
      return <Postboksadresse {...props.kontaktadresse} />;
    case "UTENLANDSK_ADRESSE":
      return <UtenlanskAdresse {...props.kontaktadresse} />;
    default:
      return null;
  }
};

export default Kontaktadresse;
