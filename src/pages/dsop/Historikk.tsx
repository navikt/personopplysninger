import React, { useEffect } from "react";
import { fetchDsopInfo } from "../../clients/apiClient";
import Error, { HTTPError } from "../../components/error/Error";
import { useStore } from "../../providers/Provider";
import { DsopInfo } from "../../types/dsop";
import { Element } from "nav-frontend-typografi";
import Moment from "react-moment";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import Spinner from "../../components/spinner/Spinner";

export type FetchDsopInfo =
  | { status: "LOADING" }
  | { status: "RESULT"; data: DsopInfo }
  | { status: "ERROR"; error: HTTPError };

const DsopHistorikk = () => {
  const [{ dsopInfo }, dispatch] = useStore();

  useEffect(() => {
    if (dsopInfo.status === "LOADING") {
      fetchDsopInfo()
        .then(dsopInfo =>
          dispatch({
            type: "SETT_DSOP_INFO_RESULT",
            payload: dsopInfo as DsopInfo
          })
        )
        .catch((error: HTTPError) =>
          dispatch({ type: "SETT_DSOP_INFO_ERROR", payload: error })
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (dsopInfo.status) {
    case "LOADING":
      return <Spinner />;

    case "RESULT":
      return (
        <div className="historikk__tabs-innhold historikk__flex-table">
          {dsopInfo.data.length > 0 ? (
            <>
              <div className="historikk__flex-rad historikk__head">
                <div className="historikk__flex-kolonne">
                  <Element>Uthentingstidspunkt</Element>
                </div>
                <div className="historikk__flex-kolonne">
                  <Element>Mottaker</Element>
                </div>
              </div>
              {dsopInfo.data.map((dsopInnslag, i) => (
                <div className="historikk__flex-rad" key={i}>
                  <div className="historikk__flex-kolonne historikk__heading">
                    <Moment format="DD.MM.YYYY hh:mm:ss">
                      {dsopInnslag.uthentingsTidspunkt}
                    </Moment>
                  </div>
                  <div className="historikk__flex-kolonne">
                    {dsopInnslag.mottaker}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="historikk__ingen-data">
              <AlertStripeInfo>Ingen data</AlertStripeInfo>
            </div>
          )}
        </div>
      );
    case "ERROR":
      return <Error error={dsopInfo.error} />;
  }
};

export default DsopHistorikk;
