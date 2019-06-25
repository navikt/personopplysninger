import React, { useEffect, useState } from "react";
import { Undertittel, Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import Error, { HTTPError } from "../../../../../../components/error/Error";
import Spinner from "../../../../../../components/spinner/Spinner";
import { fetchKontaktInfo } from "../../../../../../clients/apiClient";
import { KontaktInfo } from "../../../../../../types/kontaktInfo";
import KontaktInformasjon from "./KontaktInformasjon";
import { useStore } from "../../../../../../providers/Provider";
import iIcon from "../../../../../../assets/img/Informasjon.svg";
import Modal from "nav-frontend-modal";

export type FetchKontaktInfo =
  | { status: "LOADING" }
  | { status: "RESULT"; data: KontaktInfo }
  | { status: "ERROR"; error: HTTPError };

const DKIF = () => {
  const [{ kontaktInfo }, dispatch] = useStore();
  const [visBeskrivelse, settVisBeskrivelse] = useState(false);

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
          <img
            src={iIcon}
            className="dkif__overskrift-i-icon"
            alt="Les mer om kontakt og reservasjonsregisteret"
            onClick={() => settVisBeskrivelse(true)}
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
      <Modal
        isOpen={visBeskrivelse}
        onRequestClose={() => settVisBeskrivelse(false)}
        closeButton={true}
        contentLabel="Min modalrute"
        className="box__modal"
      >
        <div style={{ padding: "2rem 2.5rem" }}>
          <div className="box__ingress">
            <Normaltekst>
              <FormattedMessage id="personalia.dkif.beskrivelse" />
            </Normaltekst>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DKIF;
