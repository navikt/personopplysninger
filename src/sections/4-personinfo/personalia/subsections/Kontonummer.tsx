import React from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { FormattedHTMLMessage } from "react-intl";
import { Undertittel } from "nav-frontend-typografi";
import Kilde from "../../../../components/kilde/Kilde";
import ListElement from "../../../../components/listelement/ListElement";
import Environment from "../../../../utils/Environments";

const { tjenesteUrl } = Environment();

interface Props {
  kontonummer?: string;
}

const Kontonummer = ({ kontonummer }: Props) => {
  const formattertKontonr =
    kontonummer && kontonummer.length === 11
      ? kontonummer.replace(/^(.{4})(.{2})(.*)$/, "$1 $2 $3")
      : kontonummer;

  return (
    <>
      <hr className="box__linje-bred" />
      <div className="underseksjon__overskrift">
        <Undertittel>Opplysninger knyttet til utbetaling</Undertittel>
      </div>
      {kontonummer ? (
        <>
          <ul className="list-column-2">
            <ListElement
              titleId="personalia.account_no"
              content={formattertKontonr}
            />
          </ul>
          <Kilde
            kilde="personalia.source.nav"
            lenke={`${tjenesteUrl}/brukerprofil/`}
            lenkeTekst="personalia.link.brukerprofil.endre"
          />
        </>
      ) : (
        <>
          <div className="message">
            <Normaltekst>
              <FormattedHTMLMessage id="personalia.account_no.ingenData" />
            </Normaltekst>
          </div>
          <Kilde
            kilde="personalia.source.nav"
            lenke={`${tjenesteUrl}/brukerprofil/`}
            lenkeTekst="personalia.link.brukerprofil.leggtil"
          />
        </>
      )}
    </>
  );
};

export default Kontonummer;
