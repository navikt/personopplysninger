import React, { useEffect } from "react";
import Error, { HTTPError } from "components/error/Error";
import { useStore } from "../Provider";
import { fetchAuthOidc, fetchAuthInfo, sendTilLogin } from "clients/apiClient";
import { AuthInfo, AuthOidc } from "types/authInfo";
import Spinner from "components/spinner/Spinner";

export type FetchAuthInfo =
  | { status: "LOADING" }
  | { status: "RESULT"; data: AuthInfo }
  | { status: "ERROR"; error: HTTPError };

interface Props {
  children: any;
}

const Auth = (props: Props) => {
  const [{ auth }, dispatch] = useStore();

  const checkAuthOidc = (oidc: AuthOidc) => {
    if (!oidc.authenticated) {
      sendTilLogin();
    }
  };

  const checkAuthInfo = (authInfo: AuthInfo) => {
    if (authInfo.authenticated && authInfo.securityLevel === "4") {
      dispatch({ type: "SETT_AUTH_RESULT", payload: authInfo });
    } else {
      sendTilLogin();
    }
  };

  useEffect(() => {
    if (auth.status === "LOADING") {
      fetchAuthOidc()
        .then(checkAuthOidc)
        .then(fetchAuthInfo)
        .then(checkAuthInfo)
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
      return <>{props.children}</>;
    case "ERROR":
      return <Error error={auth.error} />;
  }
};

export default Auth;
