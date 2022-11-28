import React from "react";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import ListElement from "components/listelement/ListElement";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { formatOrgnr, RADIX_DECIMAL } from "../../../utils/formattering";
import Hjelpetekst from "nav-frontend-hjelpetekst";
import { InstInnslag } from "../../../types/inst";

const InstDetaljerView = (props: { innslag: InstInnslag }) => {
  const { innslag } = props;

  return (
    <div>
      <div className="detaljer__tittel">
        <Undertittel>{innslag.institusjonsnavn}</Undertittel>
        {innslag.organisasjonsnummer && (
          <Normaltekst>
            <FormattedMessage
              id="side.organisasjonsnummer"
              values={{
                orgnr: formatOrgnr(
                  parseInt(
                    innslag.organisasjonsnummer,
                    RADIX_DECIMAL
                  ).toString()
                ),
              }}
            />
          </Normaltekst>
        )}
      </div>
      <hr className="box__linje-bred" />
      <div className="box">
        <div className="box__content">
          <ul className="list-column-2">
            <ListElement
              titleId={"inst.institusjonstype"}
              content={innslag.institusjonstype}
            />
            <ListElement
              titleId={"inst.periode"}
              content={
                <div className={"inst__periode"}>
                  {`${moment(innslag.startdato).format("DD.MM.YYYY")} - ${
                    innslag.faktiskSluttdato
                      ? moment(innslag.faktiskSluttdato).format("DD.MM.YYYY")
                      : ``
                  }`}
                  {innslag.fiktivSluttdato && (
                    <Hjelpetekst>
                      <FormattedMessage id={"inst.fiktivSluttdato"} />
                    </Hjelpetekst>
                  )}
                </div>
              }
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InstDetaljerView;
