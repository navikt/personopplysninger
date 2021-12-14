import React from "react";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { Normaltekst } from "nav-frontend-typografi";
import { UtenlandskAdresse as UtenlandskAdresseType } from "types/adresser/kontaktadresse";

const UtenlanskAdresse = (props: UtenlandskAdresseType) => {
  const { postboksNummerNavn, postkode } = props;
  const { adressenavnNummer, bygningEtasjeLeilighet } = props;
  const { gyldigTilOgMed, coAdressenavn } = props;
  const { bySted, regionDistriktOmraade, land } = props;
  return (
    <>
      {coAdressenavn && (
        <div className="adresse__linje">
          <Normaltekst>{coAdressenavn}</Normaltekst>
        </div>
      )}
      {adressenavnNummer && (
        <div className="adresse__linje">
          <Normaltekst>{adressenavnNummer}</Normaltekst>
        </div>
      )}
      {bygningEtasjeLeilighet && (
        <div className="adresse__linje">
          <Normaltekst>{bygningEtasjeLeilighet}</Normaltekst>
        </div>
      )}
      {postboksNummerNavn && (
        <div className="adresse__linje">
          <Normaltekst>{postboksNummerNavn}</Normaltekst>
        </div>
      )}
      {(postkode || bySted) && (
        <div className="adresse__linje">
          <Normaltekst>
            {postkode || ""} {bySted || ""}
          </Normaltekst>
        </div>
      )}
      {regionDistriktOmraade && (
        <div className="adresse__linje">
          <Normaltekst>{regionDistriktOmraade}</Normaltekst>
        </div>
      )}
      {land && (
        <div className="adresse__linje">
          <Normaltekst>{land}</Normaltekst>
        </div>
      )}
      <div className="adresse__divider" />
      <AlertStripeInfo>
        <FormattedMessage
          id="adresse.kontaktadresse.alert"
          values={{ dato: moment(gyldigTilOgMed).format("LL") }}
        />
      </AlertStripeInfo>
    </>
  );
};

// @ts-ignore
export default UtenlanskAdresse;
