import React from "react";
import Postnummer from "../../../komponenter/Postnummer";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { Postboksadresse as PostboksadresseType } from "types/adresser/kontaktadresse";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { Normaltekst } from "nav-frontend-typografi";

const Postboksadresse = (props: PostboksadresseType) => {
  const { postbokseier, postboks, postnummer } = props;
  const { poststed, gyldigTilOgMed } = props;
  return (
    <>
      <div className="adresse__linje">
        <Normaltekst>{postbokseier}</Normaltekst>
      </div>
      <div className="adresse__linje">
        <Normaltekst>{postboks}</Normaltekst>
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

export default Postboksadresse;
