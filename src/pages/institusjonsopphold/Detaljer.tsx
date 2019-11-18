import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import ListElement from "../../components/listelement/ListElement";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { InstInfo } from "../../types/inst";

interface Props {
  instInfo: InstInfo;
}

interface Routes {
  id: string;
}

const InstDetaljer = (props: Props & RouteComponentProps<Routes>) => {
  const { instInfo } = props;
  const { id } = props.match.params;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const instInnslag = instInfo
    .filter(d => d.registreringstidspunkt === id)
    .shift();

  return instInnslag ? (
    <div>
      <div className="detaljer__tittel">
        <Undertittel>{instInnslag.institusjonsnavn}</Undertittel>
        <Normaltekst>
          <FormattedMessage
            id="side.organisasjonsnummer"
            values={{ orgnr: instInnslag.organisasjonsnummer }}
          />
        </Normaltekst>
      </div>
      <hr className="box__linje-bred" />
      <div className="box">
        <div className="box__content">
          <ul className="list-column-2">
            <ListElement
              titleId={"instInnslag.periode"}
              content={`${moment(instInnslag.startdato).format(
                "DD.MM.YYYY"
              )} - ${
                instInnslag.faktiskSluttdato
                  ? moment(instInnslag.faktiskSluttdato).format("DD.MM.YYYY")
                  : ``
              }`}
            />
            <ListElement
              titleId={"instInnslag.registreringstidspunkt"}
              content={moment(instInnslag.registreringstidspunkt).format(
                "DD.MM.YYYY hh:mm"
              )}
            />
            <ListElement
              titleId={"instInnslag.institusjonsnavn"}
              content={instInnslag.institusjonsnavn}
            />
            <ListElement
              titleId={"instInnslag.institusjonstype"}
              content={instInnslag.institusjonstype}
            />
            <ListElement
              titleId={"instInnslag.startdato"}
              content={instInnslag.startdato}
            />
            <ListElement
              titleId={"instInnslag.faktiskSluttdato"}
              content={instInnslag.faktiskSluttdato}
            />
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <FormattedMessage id="dsop.ingendata" />
    </div>
  );
};

export default withRouter(InstDetaljer);
