import React, { PureComponent, useEffect, useState } from "react";
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

// Lagre i minne og ikke i
// sessionStorage pga sensitive data
let persistState: State = { status: "LOADING" };

const DKIF = () => {
  const [state, setState] = useState(persistState);

  useEffect(() => {
    if (state.status !== "RESULT") {
      fetchKontaktInfo()
        .then((kontaktInfo: KontaktInfo) =>
          setState({
            status: "RESULT",
            kontaktInfo
          })
        )
        .catch((error: HTTPError) =>
          setState({ status: "ERROR", error: error })
        );
    }
    return () => {
      persistState = state;
    };
  }, [state]);

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
        switch (state.status) {
          case "LOADING":
            return <Spinner />;
          case "RESULT":
            return <KontaktInformasjon info={state.kontaktInfo} />;
          case "ERROR":
            return <Error error={state.error} />;
        }
      })()}
    </>
  );
};

export default DKIF;
