import React, { useEffect } from "react";
import { DsopInfo } from "../../types/dsop";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import ListElement from "../../components/listelement/ListElement";
import { FormattedMessage } from "react-intl";
import FileSaver from "file-saver";
import moment from "moment";
import { Hovedknapp } from "nav-frontend-knapper";

interface Props {
  dsopInfo: DsopInfo;
}

interface Routes {
  id: string;
}

const DsopDetaljer = (props: Props & RouteComponentProps<Routes>) => {
  const { dsopInfo } = props;
  const { id } = props.match.params;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dsopInnslag = dsopInfo
    .filter(d => d.uthentingsTidspunkt === id)
    .shift();

  return dsopInnslag ? (
    (() => {
      const onClick = () => {
        const leverteData = JSON.parse(atob(dsopInnslag.leverteData));
        const fileContent = new Blob([leverteData], {
          type: "application/json"
        });
        const fileName = "utleverte-data.json";
        FileSaver.saveAs(fileContent, fileName);
      };
      return (
        <div>
          <div className="detaljer__tittel">
            <Undertittel>{dsopInnslag.mottakernavn}</Undertittel>
            <Normaltekst>
              <FormattedMessage
                id="side.organisasjonsnummer"
                values={{ orgnr: dsopInnslag.mottaker }}
              />
            </Normaltekst>
          </div>
          <hr className="box__linje-bred" />
          <div className="box">
            <div className="box__content">
              <ul className="list-column-2">
                <ListElement
                  titleId={"dsop.uthentingstidspunkt"}
                  content={moment(dsopInnslag.uthentingsTidspunkt).format(
                    "DD.MM.YYYY hh:mm"
                  )}
                />
                <ListElement
                  titleId={"dsop.personnummer"}
                  content={dsopInnslag.person}
                />
                <ListElement titleId={"dsop.tema"} content={dsopInnslag.tema} />
                <ListElement
                  titleId={"dsop.behanglingsGrunnlag"}
                  content={dsopInnslag.behandlingsGrunnlag}
                />
              </ul>
            </div>
            <div className="detaljer__container">
              <Hovedknapp onClick={onClick}>
                <FormattedMessage id="dsop.lastned" />
              </Hovedknapp>
            </div>
          </div>
        </div>
      );
    })()
  ) : (
    <div>
      <FormattedMessage id="dsop.ingendata" />
    </div>
  );
};

export default withRouter(DsopDetaljer);
