import React from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { UtenlandskAdresseIFrittFormat as IUtenlanskAdresseIFrittFormat } from "types/adresser/kontaktadresse";
import GateAdresse from "../../../komponenter/GateAdresse";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { FormattedMessage } from "react-intl";
import moment from "moment";

const UtenlanskAdresseIFrittFormat = (props: IUtenlanskAdresseIFrittFormat) => {
  const { adresselinje1, adresselinje2, adresselinje3 } = props;
  const { gyldigTilOgMed, land } = props;
  return (
    <>
      <GateAdresse
        adresse1={adresselinje1}
        adresse2={adresselinje2}
        adresse3={adresselinje3}
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
          values={{ dato: moment(gyldigTilOgMed).format("LL") }}
        />
      </AlertStripeInfo>
    </>
  );
};

export default UtenlanskAdresseIFrittFormat;
