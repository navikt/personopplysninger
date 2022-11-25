import React, { useEffect } from "react";
import { MedlInfo, MedlInnslag } from "types/medl";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import Moment from "react-moment";
import { FormattedMessage, useIntl } from "react-intl";
import PageContainer from "components/pagecontainer/PageContainer";
import MEDLIkon from "assets/img/MEDL.svg";
import Kalender from "assets/img/Kalender.svg";
import Check from "assets/img/Check.svg";
import WithMEDL from "./MedlFetch";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import { Normaltekst, Systemtittel, Undertittel } from "nav-frontend-typografi";
import { Element } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
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
