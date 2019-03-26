import React from "react";
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

  return kontonummer ? (
    <>
      <hr className="box__linje-bred" />
      <div className="underseksjon__overskrift">
        <Undertittel>Opplysninger knyttet til utbetaling</Undertittel>
      </div>
      <ul className="list-column-2">
        <ListElement
          titleId="personalia.account_no"
          content={formattertKontonr}
        />
      </ul>
      <Kilde
        tekst="personalia.source.nav"
        lenkeTekst="personalia.link.brukerprofil"
        href={`${tjenesteUrl}/brukerprofil/`}
      />
    </>
  ) : null;
};

export default Kontonummer;
