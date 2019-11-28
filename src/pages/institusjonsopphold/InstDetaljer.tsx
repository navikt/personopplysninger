import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import ListElement from "components/listelement/ListElement";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import INSTIkon from "assets/img/Institusjonsopphold.svg";
import WithInst from "./InstFetch";
import PageContainer from "components/pagecontainer/PageContainer";

interface Routes {
  id: string;
}

const InstDetaljer = () => {
  const params = useParams<Routes>();
  const { id } = params;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer
      tittelId={"inst.tittel"}
      icon={INSTIkon}
      backTo={"/"}
      brodsmulesti={[
        { title: "inst.tittel", path: "/institusjonsopphold" },
        { title: "inst.detaljer" }
      ]}
    >
      <WithInst>
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
              <FormattedMessage id="inst.ingendata" />
            </div>
          );
        }}
      </WithInst>
    </PageContainer>
  );
};

export default InstDetaljer;
