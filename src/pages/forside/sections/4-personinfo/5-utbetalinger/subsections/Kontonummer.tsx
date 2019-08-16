import React from "react";
import { FormattedMessage } from "react-intl";
import { Element, Normaltekst } from "nav-frontend-typografi";
import Kilde from "../../../../../../components/kilde/Kilde";
import Melding from "../../../../../../components/melding/Melding";
import ListElement from "../../../../../../components/listelement/ListElement";
import Environment from "../../../../../../utils/Environments";
import { UtenlandskBankkonto } from "../../../../../../types/personalia";
import GateAdresse from "../../../../../../components/adresse/GateAdresse";
import endreIkon from "../../../../../../assets/img/Pencil.svg";

const { tjenesteUrl } = Environment();

interface Props {
  kontonummer?: string;
  utenlandskBankkonto?: UtenlandskBankkonto;
}

const Kontonummer = (props: Props) => {
  return (
    <>
      <Kontoinformasjon {...props} />
      <Kilde
        kilde="personalia.source.nav"
        lenke={`${tjenesteUrl}/brukerprofil/`}
        lenkeTekst="personalia.link.brukerprofil.endre"
        eksternLenke={true}
        ikon={endreIkon}
      />
    </>
  );
};

const Kontoinformasjon = ({ kontonummer, utenlandskBankkonto }: Props) => {
  if (kontonummer) {
    const formattertKontonr =
      kontonummer && kontonummer.length === 11
        ? kontonummer.replace(/^(.{4})(.{2})(.*)$/, "$1 $2 $3")
        : kontonummer;

    return (
      <ul className="list-column-2">
        <ListElement titleId="personalia.kontonr" content={formattertKontonr} />
      </ul>
    );
  }

  if (utenlandskBankkonto) {
    const {
      bankkode,
      swiftkode,
      iban,
      valuta,
      banknavn,
      land,
      adresse1
    } = utenlandskBankkonto;
    return (
      <ul className="list-column-2">
        {(banknavn || land || adresse1) && (
          <BankadresseElement {...utenlandskBankkonto} />
        )}
        <ListElement
          titleId="personalia.kontonrelleriban"
          content={utenlandskBankkonto.kontonummer || iban}
        />
        <ListElement titleId="personalia.bankkode" content={bankkode} />
        <ListElement titleId="personalia.valuta" content={valuta} />
        <ListElement titleId="personalia.swiftkode" content={swiftkode} />
      </ul>
    );
  }

  return <Melding meldingId="personalia.kontonr.ingenData" />;
};

const BankadresseElement = ({
  banknavn,
  land,
  adresse1,
  adresse2,
  adresse3
}: UtenlandskBankkonto) => (
  <li>
    <Element>
      <FormattedMessage id="personalia.bank" />
    </Element>
    {banknavn && <Normaltekst>{banknavn}</Normaltekst>}
    {adresse1 && (
      <GateAdresse
        adresse1={adresse1}
        adresse2={adresse2}
        adresse3={adresse3}
      />
    )}
    {land && <Normaltekst>{land}</Normaltekst>}
  </li>
);

export default Kontonummer;
