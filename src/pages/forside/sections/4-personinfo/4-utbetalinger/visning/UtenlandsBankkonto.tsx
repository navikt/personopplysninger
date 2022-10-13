import { FormattedMessage } from "react-intl";
import GateAdresse from "../../3-adresser/komponenter/GateAdresse";
import ListElement from "components/listelement/ListElement";
import React from "react";
import { UtenlandskBankkonto } from "types/personalia";
import { friendlyFormatIBAN } from "ibantools";
import { BodyShort, Heading } from "@navikt/ds-react";

interface Props {
  utenlandskBankkonto?: UtenlandskBankkonto;
}

const Utenlandskonto = ({ utenlandskBankkonto }: Props) => {
  return utenlandskBankkonto ? (
    <ul className="list-column-2">
      <li>
        <Heading level={"3"} size={"small"}>
          <FormattedMessage id="personalia.bank" />
        </Heading>
        {utenlandskBankkonto.banknavn && (
          <BodyShort>{utenlandskBankkonto.banknavn}</BodyShort>
        )}
        <GateAdresse
          adresse1={utenlandskBankkonto.adresse1}
          adresse2={utenlandskBankkonto.adresse2}
          adresse3={utenlandskBankkonto.adresse3}
        />
        {utenlandskBankkonto.land && (
          <BodyShort>{utenlandskBankkonto.land}</BodyShort>
        )}
      </li>
      {utenlandskBankkonto.kontonummer ? (
        <ListElement
          titleId="personalia.kontonrelleriban"
          content={utenlandskBankkonto.kontonummer}
        />
      ) : utenlandskBankkonto.iban ? (
        <ListElement
          titleId="personalia.iban"
          content={friendlyFormatIBAN(utenlandskBankkonto.iban)}
        />
      ) : null}
      <ListElement
        titleId="personalia.bankkode"
        content={utenlandskBankkonto.bankkode}
      />
      <ListElement
        titleId="personalia.valuta"
        content={utenlandskBankkonto.valuta}
      />
      <ListElement
        titleId="personalia.bickode"
        content={utenlandskBankkonto.swiftkode}
      />
    </ul>
  ) : null;
};

export default Utenlandskonto;
