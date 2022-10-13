import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ListElement from "components/listelement/ListElement";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import SkattIkon from "assets/img/Skattekort.svg";
import WithSkatt from "./SkattFetch";
import PageContainer from "components/pagecontainer/PageContainer";
import { BodyShort, Heading } from "@navikt/ds-react";

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
      tittelId={"skattetrekksmeldinger.tittel"}
      icon={SkattIkon}
      backTo={"/"}
      brodsmulesti={[{ title: "skattetrekksmeldinger.tittel" }]}
    >
      <WithSkatt>
        {({ data }) => {
          const instInnslag = data
            .filter((d) => d.registreringstidspunkt === id)
            .shift();

          return instInnslag ? (
            <div>
              <div className="detaljer__tittel">
                <Heading size={"small"} level={"3"}>
                  {instInnslag.institusjonsnavn}
                </Heading>
                <BodyShort>
                  <FormattedMessage
                    id="side.organisasjonsnummer"
                    values={{ orgnr: instInnslag.organisasjonsnummer }}
                  />
                </BodyShort>
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
              <FormattedMessage id="skattetrekksmeldinger.ingendata" />
            </div>
          );
        }}
      </WithSkatt>
    </PageContainer>
  );
};

export default SkattekortDetaljer;
