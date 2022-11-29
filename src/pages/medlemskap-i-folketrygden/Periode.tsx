import React from "react";
import { MedlInnslag } from "types/medl";
import Moment from "react-moment";
import { FormattedMessage } from "react-intl";
import Kalender from "assets/img/Kalender.svg";
import { Element } from "nav-frontend-typografi";
import ListElement from "../../components/listelement/ListElement";

interface Props {
  periode: MedlInnslag;
}

const Periode = (props: Props) => {
  const { periode } = props;
  return (
    <div className="medl__flex-rad">
      <div className="medl__flex-kolonne">
        <div className={"medl__heading"}>
          <img className={"medl__kalender"} src={Kalender} alt="Kalenderikon" />
          <Element>
            <FormattedMessage id={"medl.periode"} />{" "}
            <Moment format="DD.MM.YY">{periode.fraOgMed}</Moment>
            {" - "}
            <Moment format="DD.MM.YY">{periode.tilOgMed}</Moment>
          </Element>
        </div>
        <div className={"medl__flex-grid box__content"}>
          <ul className="list-column-2">
            <ListElement
              titleId="medl.hjemmel"
              content={periode.hjemmel}
              hjelpetekstId={"medl.hjemmel.hjelpetekst"}
            />
            <ListElement
              titleId="medl.trygdedekning"
              content={periode.trygdedekning}
              hjelpetekstId={"medl.trygdedekning.hjelpetekst"}
            />
            <ListElement
              className={"medl__land"}
              titleId="medl.lovvalgsland"
              content={periode.lovvalgsland}
              hjelpetekstId={"medl.lovvalgsland.hjelpetekst"}
            />
            <ListElement
              className={"medl__land"}
              titleId="medl.statsborgerland"
              content={periode.studieinformasjon?.statsborgerland}
            />
            <ListElement
              className={"medl__land"}
              titleId="medl.studieland"
              content={periode.studieinformasjon?.studieland}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Periode;
