import React, { useEffect } from "react";
import { Undertittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import Error, { HTTPError } from "../../../../../../components/error/Error";
import Spinner from "../../../../../../components/spinner/Spinner";
import { fetchKontaktInfo } from "../../../../../../clients/apiClient";
import { KontaktInfo } from "../../../../../../types/kontaktInfo";
import KontaktInformasjon from "./KontaktInformasjon";
import { useStore } from "../../../../../../providers/Provider";
import Infotekst from "../../../../../../components/infotekst/Infotekst";
import { injectIntl, InjectedIntlProps } from "react-intl";

export type FetchKontaktInfo =
  | { status: "LOADING" }
  | { status: "RESULT"; data: KontaktInfo }
  | { status: "ERROR"; error: HTTPError };

const DKIF = (props: InjectedIntlProps) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <hr className="box__linje-bred" />
      <div className="underseksjon__overskrift">
        <div className="dkif__overskrift-container">
          <Undertittel>
            <FormattedMessage id="personalia.dkif.overskrift" />
          </Undertittel>
          <Infotekst
            beskrivelse={props.intl.formatMessage({
              id: "personalia.dkif.beskrivelse"
            })}
          />
        </div>
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

export default injectIntl(DKIF);
