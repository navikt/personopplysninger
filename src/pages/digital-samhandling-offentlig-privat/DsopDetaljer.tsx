import React, { useEffect } from "react";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import ListElement from "components/listelement/ListElement";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import FileSaver from "file-saver";
import moment from "moment";
import { Hovedknapp } from "nav-frontend-knapper";
import PageContainer from "components/pagecontainer/PageContainer";
import INSTIkon from "assets/img/Institusjonsopphold.svg";
import WithDSOP from "./DsopFetch";

interface Routes {
  id: string;
}

const DsopDetaljer = () => {
  const params = useParams<Routes>();
  const { id } = params;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer
      tittelId={"inst.tittel"}
      icon={INSTIkon}
      backTo={"/dsop"}
      brodsmulesti={[
        { title: "dsop.tittel", path: "/dsop" },
        { title: "dsop.levertedata" }
      ]}
    >
      <WithDSOP>
        {({ data }) => {
          const dsopInnslag = data
            .filter(d => d.uthentingsTidspunkt === id)
            .shift();

          return dsopInnslag ? (
            (() => {
              const onClick = () => {
                const leverteData = JSON.parse(atob(dsopInnslag.leverteData));
                const fileContent = JSON.stringify(leverteData, null, 2);
                const fileBlob = new Blob([fileContent], {
                  type: "application/json"
                });
                const fileName = "utleverte-data.json";
                FileSaver.saveAs(fileBlob, fileName);
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
                          content={moment(
                            dsopInnslag.uthentingsTidspunkt
                          ).format("DD.MM.YYYY hh:mm")}
                        />
                        <ListElement
                          titleId={"dsop.personnummer"}
                          content={dsopInnslag.person}
                        />
                        <ListElement
                          titleId={"dsop.tema"}
                          content={dsopInnslag.tema}
                        />
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
        }}
      </WithDSOP>
    </PageContainer>
  );
};

export default DsopDetaljer;
