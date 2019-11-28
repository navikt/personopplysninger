import React, { useEffect } from "react";
import { fetchDsopInfo } from "clients/apiClient";
import Error, { HTTPError } from "components/error/Error";
import { useStore } from "providers/Provider";
import { DsopInfo } from "types/dsop";
import Spinner from "components/spinner/Spinner";

export type FetchDsopInfo =
  | { status: "LOADING" }
  | { status: "RESULT"; data: DsopInfo }
  | { status: "ERROR"; error: HTTPError };

interface Routes {
  id: string;
}

interface Props {
  children: (data: { data: DsopInfo; id?: string }) => JSX.Element;
}

const WithDSOP = (props: Props) => {
  const [{ dsopInfo }, dispatch] = useStore();
  const { children } = props;

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
      return children({ data: dsopInfo.data });
    case "ERROR":
      return <Error error={dsopInfo.error} />;
  }
};

export default WithDSOP;
