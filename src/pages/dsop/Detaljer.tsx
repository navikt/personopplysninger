import React from "react";
import { DsopInfo } from "../../types/dsop";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import ListElement from "../../components/listelement/ListElement";
import ReactJson from "react-json-view";
import moment from "moment";

interface Props {
  dsopInfo: DsopInfo;
}

interface Routes {
  id: string;
}

const DsopDetaljer = (props: Props & RouteComponentProps<Routes>) => {
  const { dsopInfo } = props;
  const { id } = props.match.params;

  const dsopInnslag = dsopInfo
    .filter(d => d.uthentingsTidspunkt === id)
    .shift();

  return dsopInnslag ? (
    (() => {
      const dsopUtleverteData = JSON.parse(atob(dsopInnslag.leverteData));

      return (
        <div>
          <div className="detaljer__tittel">
            <Undertittel>Mottaker</Undertittel>
          </div>
          <Normaltekst>{dsopInnslag.mottaker}</Normaltekst>
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
              <div className="detaljer__header">
                <Undertittel>Leverte data</Undertittel>
              </div>
              <hr className="box__linje-bred" />
              <ReactJson src={dsopUtleverteData} />
            </div>
          </div>
        </div>
      );
    })()
  ) : (
    <div>Fant ikke innslag</div>
  );
};

export default withRouter(DsopDetaljer);
