import React, { useEffect } from "react";
import Error, { HTTPError } from "../error/Error";
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
        .then((authInfo: AuthInfo) =>
          authInfo.authenticated && authInfo.securityLevel === "4"
            ? dispatch({ type: "SETT_AUTH_RESULT", payload: authInfo })
            : sendTilLogin()
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
      return <>{props.children}</>;
    case "ERROR":
      return <Error error={auth.error} />;
  }
};

export default Auth;
