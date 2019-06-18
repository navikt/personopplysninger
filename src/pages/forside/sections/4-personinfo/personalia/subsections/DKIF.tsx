import React, { useEffect } from "react";
import { Undertittel, Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import Error, { HTTPError } from "../../../../../../components/error/Error";
import Spinner from "../../../../../../components/spinner/Spinner";
import { fetchKontaktInfo } from "../../../../../../clients/apiClient";
import { KontaktInfo } from "../../../../../../types/kontaktInfo";
import KontaktInformasjon from "./KontaktInformasjon";
import { useStore } from "../../../../../../providers/Provider";

export type FetchKontaktInfo =
  | { status: "LOADING" }
  | { status: "RESULT"; data: KontaktInfo }
  | { status: "ERROR"; error: HTTPError };

const DKIF = () => {
  const [{ kontaktInfo }, dispatch] = useStore();

  useEffect(() => {
    if (kontaktInfo.status === "LOADING") {
      fetchKontaktInfo()
        .then(kontaktInfo =>
          dispatch({
            type: "SETT_KONTAKT_INFO_RESULT",
            payload: kontaktInfo as KontaktInfo
          })
        )
        .catch((error: HTTPError) =>
          dispatch({ type: "SETT_KONTAKT_INFO_ERROR", payload: error })
        );
    }
  }, [kontaktInfo, dispatch]);

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
        switch (kontaktInfo.status) {
          case "LOADING":
            return <Spinner />;
          case "RESULT":
            return <KontaktInformasjon info={kontaktInfo.data} />;
          case "ERROR":
            return <Error error={kontaktInfo.error} />;
        }
      })()}
    </>
  );
};

export default DKIF;
