import React, { useEffect } from "react";
import { fetchInstInfo } from "clients/apiClient";
import Error, { HTTPError } from "components/error/Error";
import { useStore } from "providers/Provider";
import Spinner from "components/spinner/Spinner";
import { RouteComponentProps, withRouter } from "react-router";
import { InstInfo } from "types/inst";
import InstHistorikk from "./Historikk";
import InstDetaljer from "./Detaljer";

export type FetchInstInfo =
  | { status: "LOADING" }
  | { status: "RESULT"; data: InstInfo }
  | { status: "ERROR"; error: HTTPError };

interface Routes {
  id: string;
}

const WithINST = (props: RouteComponentProps<Routes>) => {
  const [{ instInfo }, dispatch] = useStore();
  const { id } = props.match.params;

  useEffect(() => {
    if (instInfo.status === "LOADING") {
      fetchInstInfo()
        .then(instInfo =>
          dispatch({
            type: "SETT_INST_INFO_RESULT",
            payload: instInfo as InstInfo
          })
        )
        .catch((error: HTTPError) =>
          dispatch({ type: "SETT_INST_INFO_ERROR", payload: error })
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (instInfo.status) {
    case "LOADING":
      return <Spinner />;
    case "RESULT":
      return id ? (
        <InstDetaljer instInfo={instInfo.data} />
      ) : (
        <InstHistorikk instInfo={instInfo.data} />
      );
    case "ERROR":
      return <Error error={instInfo.error} />;
  }
};

export default withRouter(WithINST);
