import React, { ReactChild, useEffect } from "react";
import { FeatureToggles } from "../../providers/Store";
import { HTTPError } from "../error/Error";
import { useStore } from "../../providers/Provider";
import { fetchAuthInfo } from "../../clients/apiClient";
import { AuthInfo } from "../../types/authInfo";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

export type FetchFeatureToggles = { data: FeatureToggles } & (
  | { status: "LOADING" }
  | { status: "RESULT" }
  | { status: "ERROR"; error: HTTPError });

interface Props {
  children: any;
}

const Auth = (props: Props) => {
  const [{ auth }, dispatch] = useStore();

  useEffect(() => {
    if (auth.status === "LOADING") {
      fetchAuthInfo()
        .then((authInfo: AuthInfo) =>
          dispatch({ type: "SETT_AUTH_RESULT", payload: authInfo })
        )
        .catch((error: HTTPError) =>
          dispatch({ type: "SETT_AUTH_ERROR", payload: error })
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (auth.status) {
    case "LOADING":
      return <Spinner />;
    case "RESULT":
      return auth.data.authenticated ? <>{props.children}</> : <Spinner />;
    case "ERROR":
      return <Error error={auth.error} />;
  }
};

export default Auth;
