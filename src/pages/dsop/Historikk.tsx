import React, { useEffect } from "react";
import { fetchDsopInfo } from "../../clients/apiClient";
import { HTTPError } from "../../components/error/Error";
import { useStore } from "../../providers/Provider";
import { DsopInfo } from "../../types/dsop";

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

  console.log(dsopInfo);
  return <div>Dsop</div>;
};

export default DsopHistorikk;
