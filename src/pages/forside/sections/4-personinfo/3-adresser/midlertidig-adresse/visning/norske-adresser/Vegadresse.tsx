import React from "react";
import Postnummer from "../../../komponenter/Postnummer";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { Vegadresse as VegadresseType } from "types/adresser/kontaktadresse";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { Normaltekst } from "nav-frontend-typografi";

const Vegadresse = (props: VegadresseType) => {
  const { husnummer, husbokstav, bruksenhetsnummer } = props;
  const { adressenavn, tilleggsnavn } = props;
  const { postnummer, poststed, gyldigTilOgMed, coAdressenavn } = props;
  return (
    <>
      {tilleggsnavn && (
        <div className="adresse__linje">
          <Normaltekst>{tilleggsnavn}</Normaltekst>
        </div>
      )}
      {coAdressenavn && (
        <div className="adresse__linje">
          <Normaltekst>{coAdressenavn}</Normaltekst>
        </div>
      )}
      {(adressenavn || husnummer || husbokstav || bruksenhetsnummer) && (
        <div className="adresse__linje">
          <Normaltekst>
            {adressenavn || ""} {husnummer || ""} {husbokstav || ""}{" "}
            {bruksenhetsnummer || ""}
          </Normaltekst>
        </div>
      )}
      <Postnummer postnummer={postnummer} poststed={poststed} />
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

export default Vegadresse;
