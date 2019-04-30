import React from "react";
import { FormattedMessage } from "react-intl";
import { Element, Normaltekst, Undertittel } from "nav-frontend-typografi";
import Kilde from "../../../../components/kilde/Kilde";
import Melding from "../../../../components/melding/Melding";
import ListElement from "../../../../components/listelement/ListElement";
import Environment from "../../../../utils/Environments";
import { UtenlandskBankkonto } from "../../../../types/personalia";
import GateAdresse from "../../../../components/adresse/GateAdresse";

const { tjenesteUrl } = Environment();

interface Props {
  kontonummer?: string;
  utenlandskBankkonto?: UtenlandskBankkonto;
}

const Kontonummer = (props: Props) => {
  return (
    <>
      <hr className="box__linje-bred" />
      <div className="underseksjon__overskrift">
        <Undertittel>
          <FormattedMessage id="personalia.kontonr.oveskrift" />
        </Undertittel>
      </div>
      <>
        <Kontoinformasjon {...props} />
        <Kilde
          kilde="personalia.source.nav"
          lenke={`${tjenesteUrl}/brukerprofil/`}
          lenkeTekst="personalia.link.brukerprofil.endre"
        />
      </>
    </>
  );
};

const formattertKontonr = (kontonummer: string) =>
  kontonummer && kontonummer.length === 11
    ? kontonummer.replace(/^(.{4})(.{2})(.*)$/, "$1 $2 $3")
    : kontonummer;

const Kontoinformasjon = ({ kontonummer, utenlandskBankkonto }: Props) => {
  if (kontonummer) {
    return (
      <ul className="list-column-2">
        <ListElement
          titleId="personalia.kontonr"
          content={formattertKontonr(kontonummer)}
        />
      </ul>
    );
  }

  if (utenlandskBankkonto) {
    const {
      bankkode,
      land,
      swiftkode,
      iban,
      banknavn,
      valuta,
      adresse1,
      adresse2,
      adresse3
    } = utenlandskBankkonto;
    return (
      <ul className="list-column-2">
        <ListElement
          titleId="personalia.kontonrelleriban"
          content={utenlandskBankkonto.kontonummer || iban}
        />
        <ListElement titleId="personalia.bankkode" content={bankkode} />
        <ListElement titleId="personalia.bankland" content={land} />
        <ListElement titleId="personalia.banknavn" content={banknavn} />
        {adresse1 && (
          <li>
            <Element>
              <FormattedMessage id="personalia.bankadresse" />
            </Element>
            <GateAdresse adresse1={adresse1} adresse2={adresse2} adresse3={adresse3} />
          </li>
        )}
        <ListElement titleId="personalia.valuta" content={valuta} />
        <ListElement titleId="personalia.swiftkode" content={swiftkode} />
      </ul>
    );
  }
  return <Melding meldingId="personalia.kontonr.ingenData" />;
};

export default Kontonummer;
