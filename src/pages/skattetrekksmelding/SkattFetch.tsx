import React, { useEffect } from "react";
import { fetchskattetrekksmeldinger } from "clients/apiClient";
import Error, { HTTPError } from "components/error/Error";
import { useStore } from "store/Context";
import Spinner from "components/spinner/Spinner";
import { Skattetrekksmeldinger } from "types/skattetrekksmeldinger";

export type Fetchskattetrekksmeldinger =
  | { status: "LOADING" }
  | { status: "RESULT"; data: Skattetrekksmeldinger }
  | { status: "ERROR"; error: HTTPError };

interface Props {
  children: (data: { data: Skattetrekksmeldinger; id?: string }) => JSX.Element;
}

const Withskattetrekksmelding = ({ children }: Props) => {
  const [{ skattetrekksmeldinger }, dispatch] = useStore();

  useEffect(() => {
    if (skattetrekksmeldinger.status === "LOADING") {
      fetchskattetrekksmeldinger()
        .then(result =>
          dispatch({
            type: "SETT_SKATT_RESULT",
            payload: result as Skattetrekksmeldinger
          })
        )
        .catch((error: HTTPError) =>
          dispatch({
            type: "SETT_SKATT_ERROR",
            payload: error
          })
        );
    }
  }, [skattetrekksmeldinger, dispatch]);

  switch (skattetrekksmeldinger.status) {
    case "LOADING":
      return <Spinner />;
    case "RESULT":
      return children({ data: skattetrekksmeldinger.data });
    case "ERROR":
      return <Error error={skattetrekksmeldinger.error} />;
  }
};

export default Withskattetrekksmelding;
