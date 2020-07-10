import React from "react";
import { Kontaktadresse as IKontaktadresse } from "types/adresser/kontaktadresse";
import NorskPostadresseIFrittFormat from "./NorskPostadresseIFrittFormat";
import UtenlanskAdresseIFrittFormat from "./UtenlanskAdresseIFrittFormat";

interface Props {
  kontaktadresse: IKontaktadresse;
}

const Kontaktadresse = (props: Props) => {
  switch (props.kontaktadresse.type) {
    case "POSTADRESSE_I_FRITT_FORMAT":
      return <NorskPostadresseIFrittFormat {...props.kontaktadresse} />;
    case "UTENLANDSK_ADRESSE_I_FRITT_FORMAT":
      return <UtenlanskAdresseIFrittFormat {...props.kontaktadresse} />;
    case "VEGADRESSE":
      return <div>VEGADRESSE</div>;
    case "UTENLANDSK_ADRESSE":
      return <div>UTENLANDSK_ADRESSE</div>;
    default:
      return null;
  }
};

export default Kontaktadresse;
