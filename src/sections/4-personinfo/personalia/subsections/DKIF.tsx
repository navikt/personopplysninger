import React, { PureComponent } from "react";
import { Undertittel, Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import Error, { HTTPError } from "../../../../components/error/Error";
import Spinner from "../../../../components/spinner/Spinner";
import { fetchKontaktInfo } from "../../../../clients/apiClient";
import { KontaktInfo } from "../../../../types/kontaktInfo";
import KontaktInformasjon from "./KontaktInformasjon";

type State =
  | { status: "LOADING" }
  | { status: "RESULT"; kontaktInfo: KontaktInfo }
  | { status: "ERROR"; error: HTTPError };

class DKIF extends PureComponent<{}, State> {
  static state: State = {
    status: "LOADING"
  };

  componentDidMount = () => {
    if (DKIF.state.status !== "RESULT") {
      fetchKontaktInfo()
        .then((kontaktInfo: KontaktInfo) => {
          DKIF.state = {
            status: "RESULT",
            kontaktInfo
          };
        })
        .catch((error: HTTPError) => {
          DKIF.state = {
            status: "ERROR",
            error
          };
        })
        .then(() => this.forceUpdate());
    }
  };

  render = () => (
    <>
      <hr className="box__linje-bred" />
      <div className="underseksjon__overskrift">
        <Undertittel>
          <FormattedMessage id="personalia.dkif.overskrift" />
        </Undertittel>
      </div>
      <div className="underseksjon__beskrivelse">
        <Normaltekst>
          <FormattedMessage id="personalia.dkif.beskrivelse" />
        </Normaltekst>
      </div>
      {(() => {
        switch (DKIF.state.status) {
          case "LOADING":
            return <Spinner />;
          case "RESULT":
            return <KontaktInformasjon info={DKIF.state.kontaktInfo} />;
          case "ERROR":
            return <Error error={DKIF.state.error} />;
        }
      })()}
    </>
  );
}

export default DKIF;
