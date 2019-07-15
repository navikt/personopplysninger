import React, { useEffect } from "react";
import { HTTPError } from "../error/Error";
import { useStore } from "../../providers/Provider";
import { fetchAuthInfo, sendTilLogin } from "../../clients/apiClient";
import { AuthInfo } from "../../types/authInfo";
import Spinner from "../spinner/Spinner";

export type FetchAuthInfo =
  | { status: "LOADING" }
  | { status: "RESULT"; data: AuthInfo }
  | { status: "ERROR"; error: HTTPError };

interface Props {
  children: any;
}

const Auth = (props: Props) => {
  const [{ auth }, dispatch] = useStore();

  useEffect(() => {
    if (auth.status === "LOADING") {
      fetchAuthInfo()
        .then((authInfo: AuthInfo) => {
          dispatch({ type: "SETT_AUTH_RESULT", payload: authInfo });
          if (!authInfo.authenticated) {
            sendTilLogin();
          }
        })
        .catch((error: HTTPError) =>
          dispatch({ type: "SETT_AUTH_ERROR", payload: error })
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (auth.status) {
    case "LOADING":
    case "ERROR":
      return <Spinner />;
    case "RESULT":
      return auth.data.authenticated ? <>{props.children}</> : <Spinner />;
  }
};

export default Auth;
