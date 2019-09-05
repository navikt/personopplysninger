import { Element, Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import GateAdresse from "../../../../../../components/adresse/GateAdresse";
import ListElement from "../../../../../../components/listelement/ListElement";
import React from "react";
import { UtenlandskBankkonto } from "../../../../../../types/personalia";

interface Props {
  utenlandskBankkonto?: UtenlandskBankkonto;
}

const Utenlandskonto = ({ utenlandskBankkonto }: Props) => {
  return utenlandskBankkonto ? (
    <ul className="list-column-2">
      <li>
        <Element>
          <FormattedMessage id="personalia.bank" />
        </Element>
        {utenlandskBankkonto.banknavn && (
          <Normaltekst>{utenlandskBankkonto.banknavn}</Normaltekst>
        )}
        <GateAdresse
          adresse1={utenlandskBankkonto.adresse1}
          adresse2={utenlandskBankkonto.adresse2}
          adresse3={utenlandskBankkonto.adresse3}
        />
        {utenlandskBankkonto.land && (
          <Normaltekst>{utenlandskBankkonto.land}</Normaltekst>
        )}
      </li>
      <ListElement
        titleId="personalia.kontonrelleriban"
        content={utenlandskBankkonto.kontonummer || utenlandskBankkonto.iban}
      />
      <ListElement
        titleId="personalia.bankkode"
        content={utenlandskBankkonto.bankkode}
      />
      <ListElement
        titleId="personalia.valuta"
        content={utenlandskBankkonto.valuta}
      />
      <ListElement
        titleId="personalia.swiftkode"
        content={utenlandskBankkonto.swiftkode}
      />
    </ul>
  ) : null;
};

export default Utenlandskonto;
