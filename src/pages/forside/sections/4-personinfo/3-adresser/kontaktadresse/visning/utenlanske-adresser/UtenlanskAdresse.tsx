import React from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { UtenlandskAdresse as UtenlandskAdresseType } from "types/adresser/adresse";

const UtenlanskAdresse = (props: UtenlandskAdresseType) => {
  const { postboksNummerNavn, postkode } = props;
  const { adressenavnNummer, bygningEtasjeLeilighet } = props;
  const { coAdressenavn } = props;
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
    </>
  );
};

// @ts-ignore
export default UtenlanskAdresse;
