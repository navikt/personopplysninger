import React, { useEffect } from "react";
import ListElement from "components/listelement/ListElement";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import FileSaver from "file-saver";
import moment from "moment";
import PageContainer from "components/pagecontainer/PageContainer";
import DSOPIkon from "assets/img/DSOP.svg";
import WithDSOP from "./DsopFetch";
import { BodyShort, Button, Label } from "@navikt/ds-react";

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
      tittelId={"dsop.tittel"}
      icon={DSOPIkon}
      backTo={"/dsop"}
      brodsmulesti={[
        { title: "dsop.tittel", path: "/dsop" },
        { title: "dsop.levertedata" },
      ]}
    >
      <WithDSOP>
        {({ data }) => {
          const innslag = data
            .filter((d) => d.uthentingsTidspunkt === id)
            .shift();

          return innslag ? (
            (() => {
              const onClick = () => {
                const leverteData = JSON.parse(atob(innslag.leverteData));
                const fileContent = JSON.stringify(leverteData, null, 2);
                const fileBlob = new Blob([fileContent], {
                  type: "application/json",
                });
                const fileName = "utleverte-data.json";
                FileSaver.saveAs(fileBlob, fileName);
              };
              return (
                <div>
                  <div className="detaljer__tittel">
                    <Label as="p">{innslag.mottakernavn}</Label>
                    <BodyShort>
                      <FormattedMessage
                        id="side.organisasjonsnummer"
                        values={{ orgnr: innslag.mottaker }}
                      />
                    </BodyShort>
                  </div>
                  <hr className="box__linje-bred" />
                  <div className="box">
                    <div className="box__content">
                      <ul className="list-column-2">
                        <ListElement
                          titleId={"dsop.uthentingstidspunkt"}
                          content={moment(innslag.uthentingsTidspunkt).format(
                            "DD.MM.YYYY hh:mm"
                          )}
                        />
                        <ListElement
                          titleId={"dsop.personnummer"}
                          content={innslag.person}
                        />
                        <ListElement
                          titleId={"dsop.tema"}
                          content={innslag.tema}
                        />
                        <ListElement
                          titleId={"dsop.behanglingsGrunnlag"}
                          content={innslag.behandlingsGrunnlag}
                        />
                      </ul>
                    </div>
                    <div className="detaljer__container">
                      <Button onClick={onClick}>
                        <FormattedMessage id="dsop.lastned" />
                      </Button>
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
