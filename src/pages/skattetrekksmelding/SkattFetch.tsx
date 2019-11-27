import React, { useEffect } from "react";
import { fetchInstInfo } from "clients/apiClient";
import Error, { HTTPError } from "components/error/Error";
import { useStore } from "providers/Provider";
import Spinner from "components/spinner/Spinner";
import { useParams } from "react-router-dom";
import { InstInfo } from "types/inst";

export type FetchInstInfo =
  | { status: "LOADING" }
  | { status: "RESULT"; data: InstInfo }
  | { status: "ERROR"; error: HTTPError };

interface Props {
  children: (data: { data: InstInfo; id?: string }) => JSX.Element;
}

interface Routes {
  id: string;
}

const WithSkattetreksmelding = ({ children }: Props) => {
  const [{ instInfo }, dispatch] = useStore();
  const { id } = useParams();

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
      return children({ data: instInfo.data, id });
    case "ERROR":
      return <Error error={instInfo.error} />;
  }
};

export default WithSkattetreksmelding;
