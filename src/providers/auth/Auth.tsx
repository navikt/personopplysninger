import React, { useEffect } from "react";
import Error, { HTTPError } from "components/error/Error";
import { useStore } from "../Provider";
import { fetchName, sendTilLogin } from "clients/apiClient";
import { NameInfo } from "types/authInfo";
import Spinner from "components/spinner/Spinner";

export type FetchNameInfo =
  | { status: "LOADING" }
  | { status: "RESULT"; data: NameInfo }
  | { status: "ERROR"; error: HTTPError };

interface Props {
  children: any;
}

const Auth = (props: Props) => {
  const [{ auth }, dispatch] = useStore();

  useEffect(() => {
    if (auth.status === "LOADING") {
      fetchName()
        .then((result: NameInfo) => {
          dispatch({ type: "SETT_NAME_RESULT", payload: result });
        })
        .catch(() => {
          sendTilLogin();
        });
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
