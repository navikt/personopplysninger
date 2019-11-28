import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import ListElement from "components/listelement/ListElement";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import SkattIkon from "assets/img/Skattekort.svg";
import WithSkatt from "./SkattFetch";
import PageContainer from "components/pagecontainer/PageContainer";

interface Routes {
  id: string;
}

const SkattekortDetaljer = () => {
  const params = useParams<Routes>();
  const { id } = params;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer
      tittelId={"skattetreksmeldinger.tittel"}
      icon={SkattIkon}
      backTo={"/"}
      brodsmulesti={[{ title: "skattetreksmeldinger.tittel" }]}
    >
      <WithSkatt>
        {({ data }) => {
          const instInnslag = data
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
                      titleId={"inst.periode"}
                      content={`${moment(instInnslag.startdato).format(
                        "DD.MM.YYYY"
                      )} - ${
                        instInnslag.faktiskSluttdato
                          ? moment(instInnslag.faktiskSluttdato).format(
                              "DD.MM.YYYY"
                            )
                          : ``
                      }`}
                    />
                    <ListElement
                      titleId={"inst.registreringstidspunkt"}
                      content={moment(
                        instInnslag.registreringstidspunkt
                      ).format("DD.MM.YYYY hh:mm")}
                    />
                    <ListElement
                      titleId={"inst.institusjonsnavn"}
                      content={instInnslag.institusjonsnavn}
                    />
                    <ListElement
                      titleId={"inst.institusjonstype"}
                      content={instInnslag.institusjonstype}
                    />
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <FormattedMessage id="skattetreksmeldinger.ingendata" />
            </div>
          );
        }}
      </WithSkatt>
    </PageContainer>
  );
};

export default SkattekortDetaljer;
