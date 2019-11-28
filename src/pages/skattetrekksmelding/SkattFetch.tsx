import React, { useEffect } from "react";
import { fetchSkattetreksmeldinger } from "clients/apiClient";
import Error, { HTTPError } from "components/error/Error";
import { useStore } from "store/Context";
import Spinner from "components/spinner/Spinner";
import { Skattetreksmeldinger } from "types/skattetreksmeldinger";

export type FetchSkattetreksmeldinger =
  | { status: "LOADING" }
  | { status: "RESULT"; data: Skattetreksmeldinger }
  | { status: "ERROR"; error: HTTPError };

interface Props {
  children: (data: { data: Skattetreksmeldinger; id?: string }) => JSX.Element;
}

const WithSkattetreksmelding = ({ children }: Props) => {
  const [{ skattetreksmeldinger }, dispatch] = useStore();

  useEffect(() => {
    if (skattetreksmeldinger.status === "LOADING") {
      fetchSkattetreksmeldinger()
        .then(result =>
          dispatch({
            type: "SETT_SKATT_RESULT",
            payload: result as Skattetreksmeldinger
          })
        )
        .catch((error: HTTPError) =>
          dispatch({
            type: "SETT_SKATT_ERROR",
            payload: error
          })
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (skattetreksmeldinger.status) {
    case "LOADING":
      return <Spinner />;
    case "RESULT":
      return children({ data: skattetreksmeldinger.data });
    case "ERROR":
      return <Error error={skattetreksmeldinger.error} />;
  }
};

export default WithSkattetreksmelding;
