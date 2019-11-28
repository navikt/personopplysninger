import React from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { UtenlandskAdresse as UtenlandskAdresseType } from "types/adresser/utenlandskadresse";
import GateAdresse from "../../komponenter/GateAdresse";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { FormattedMessage } from "react-intl";
import moment from "moment";

interface Props {
  utenlandskadresse: UtenlandskAdresseType;
}

const UtenlandskAdresse = (props: Props) => {
  const {
    adresse1,
    adresse2,
    adresse3,
    land,
    datoTilOgMed
  } = props.utenlandskadresse;
  return (
    <>
      <GateAdresse
        adresse1={adresse1}
        adresse2={adresse2}
        adresse3={adresse3}
      />
      {land && (
        <div className="adresse__linje">
          <Normaltekst>{land}</Normaltekst>
        </div>
      )}
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

export default UtenlandskAdresse;
