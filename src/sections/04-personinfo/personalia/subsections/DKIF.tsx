import React, { Component } from "react";
import { Undertittel, Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import Kilde from "../../../../components/kilde/Kilde";
import Environment from "../../../../utils/Environments";
import Error, { HTTPError } from "../../../../components/error/Error";
import Spinner from "../../../../components/spinner/Spinner";
import { fetchKontaktInfo } from "../../../../clients/apiClient";
import { KontaktInfo } from "../../../../types/kontaktInfo";
import KontaktInformasjon from "./KontaktInformasjon";

const { tjenesteUrl } = Environment();

type State =
  | { status: "LOADING" }
  | { status: "RESULT"; kontaktInfo: KontaktInfo }
  | { status: "ERROR"; error: HTTPError };

class DKIF extends Component<{}, State> {
  state: State = {
    status: "LOADING"
  };

  componentDidMount = () =>
    fetchKontaktInfo()
      .then((kontaktInfo: KontaktInfo) =>
        this.setState({
          status: "RESULT",
          kontaktInfo
        })
      )
      .catch((error: HTTPError) =>
        this.setState({
          status: "ERROR",
          error
        })
      );

  render = () => {
    return (
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
          switch (this.state.status) {
            case "LOADING":
              return <Spinner />;
            case "RESULT":
              return <KontaktInformasjon info={this.state.kontaktInfo} />;
            case "ERROR":
              return <Error error={this.state.error} />;
          }
        })()}
        <Kilde
          tekst="personalia.source.dkif"
          lenkeTekst="personalia.link.dkif"
          href="https://brukerprofil.difi.no/minprofil"
        />
      </>
    );
  };
}

export default DKIF;
