import React, { useEffect } from "react";
import { HTTPError } from "../error/Error";
import { useStore } from "../../providers/Provider";
import { fetchFeatureToggles } from "../../clients/apiClient";
import { FeatureToggles } from "../../providers/Store";

export type FetchFeatureToggles = { data: FeatureToggles } & (
  | { status: "LOADING" }
  | { status: "RESULT" }
  | { status: "ERROR"; error: HTTPError });

interface Props {
  children: any;
}

const FT = (props: Props) => {
  const [{ featureToggles }, dispatch] = useStore();

  useEffect(() => {
    if (featureToggles.status === "LOADING") {
      fetchFeatureToggles(featureToggles.data)
        .then(res =>
          dispatch({
            type: "SETT_FEATURE_TOGGLES",
            payload: res as FeatureToggles
          })
        )
        .catch((error: HTTPError) =>
          console.error(
            `Failed to fetch feature toggles - ${error.code} ${error.text}`
          )
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{props.children}</>;
};

export default FT;
