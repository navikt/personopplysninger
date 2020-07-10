import React from "react";
import Postnummer from "../../../komponenter/Postnummer";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { Vegadresse } from "types/adresser/kontaktadresse";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { Normaltekst } from "nav-frontend-typografi";

const Vegadresse = (props: Vegadresse) => {
  const { husnummer, husbokstav, bruksenhetsnummer } = props;
  const { adressenavn, kommunenummer, tilleggsnavn } = props;
  const { postnummer, poststed, gyldigTilOgMed, coAdressenavn } = props;
  return (
    <>
      <div className="adresse__linje">
        <Normaltekst>{tilleggsnavn}</Normaltekst>
      </div>
      <div className="adresse__linje">
        <Normaltekst>{coAdressenavn}</Normaltekst>
      </div>
      <div className="adresse__linje">
        <Normaltekst>
          {adressenavn} {husnummer} {husbokstav} {bruksenhetsnummer}
        </Normaltekst>
      </div>
      <div className="adresse__linje">
        <Normaltekst>{kommunenummer}</Normaltekst>
      </div>
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
