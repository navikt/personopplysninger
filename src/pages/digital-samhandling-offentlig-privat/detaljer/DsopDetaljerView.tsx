import React from "react";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import ListElement from "components/listelement/ListElement";
import { FormattedMessage } from "react-intl";
import FileSaver from "file-saver";
import moment from "moment";
import { Hovedknapp } from "nav-frontend-knapper";
import { DsopInfo } from "../../../types/dsop";

interface Props {
  id: string;
  dsopInfo: DsopInfo;
}

const DsopDetaljerView = (props: Props) => {
  const { id, dsopInfo } = props;
  const innslag = dsopInfo.filter((d) => d.uthentingsTidspunkt === id).shift();

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
            <Undertittel>{innslag.mottakernavn}</Undertittel>
            <Normaltekst>
              <FormattedMessage
                id="side.organisasjonsnummer"
                values={{ orgnr: innslag.mottaker }}
              />
            </Normaltekst>
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
                <ListElement titleId={"dsop.tema"} content={innslag.tema} />
                <ListElement
                  titleId={"dsop.behanglingsGrunnlag"}
                  content={innslag.behandlingsGrunnlag}
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

export default DsopDetaljerView;
