import React from "react";
import GateAdresse from "../../komponenter/GateAdresse";
import Postnummer from "../../komponenter/Postnummer";
import { Tilleggsadresse } from "types/adresser/tilleggsadresse";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { FormattedMessage } from "react-intl";
import moment from "moment";

interface Props {
  tilleggsadresse: Tilleggsadresse;
}

const NorskMidlertidigAdresse = (props: Props) => {
  const {
    adresse1,
    adresse2,
    adresse3,
    datoTilOgMed,
    postnummer,
    poststed
  } = props.tilleggsadresse;
  return (
    <>
      <GateAdresse
        adresse1={adresse1}
        adresse2={adresse2}
        adresse3={adresse3}
      />
      <Postnummer postnummer={postnummer} poststed={poststed} />
      <div className="adresse__divider" />
      <AlertStripeInfo>
        <FormattedMessage
          id="adresse.midlertidig.alert"
          values={{ dato: moment(datoTilOgMed).format("LL") }}
        />
      </AlertStripeInfo>
    </>
  );
};

export default NorskMidlertidigAdresse;
