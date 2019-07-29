import React from "react";
import { DsopInfo } from "../../types/dsop";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import ListElement from "../../components/listelement/ListElement";
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

  console.log(dsopInnslag);
  return dsopInnslag ? (
    <div>
      <Undertittel>Mottaker</Undertittel>
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
      </div>
    </div>
  ) : (
    <div>Fant ikke innslag</div>
  );
};

export default withRouter(DsopDetaljer);
