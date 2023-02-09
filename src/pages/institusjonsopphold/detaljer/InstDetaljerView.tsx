import React from "react";
import ListElement from "components/listelement/ListElement";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { formatOrgnr, RADIX_DECIMAL } from "../../../utils/formattering";
import { InstInnslag } from "../../../types/inst";
import { BodyShort, Heading, HelpText } from "@navikt/ds-react";

const InstDetaljerView = (props: { innslag: InstInnslag }) => {
  const { innslag } = props;

  return (
    <div>
      <div className="detaljer__tittel">
        <Heading level="2" size="small">
          {innslag.institusjonsnavn}
        </Heading>
        {innslag.organisasjonsnummer && (
          <BodyShort>
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
          </BodyShort>
        )}
      </div>
      <hr className="box__linje-bred" />
      <div className="box">
        <div className="box__content">
          <dl className="list-column-2">
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
                    <HelpText>
                      <FormattedMessage id={"inst.fiktivSluttdato"} />
                    </HelpText>
                  )}
                </div>
              }
            />
          </dl>
        </div>
      </div>
    </div>
  );
};

export default InstDetaljerView;
