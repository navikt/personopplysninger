import React, { useEffect } from "react";
import Error, { HTTPError } from "components/error/Error";
import { useStore } from "../Context";
import { NameInfo } from "types/nameInfo";
import Spinner from "components/spinner/Spinner";
import { AlertType } from "../../components/alert/Alert";
import { sjekkAuthHentNavn } from "../../clients/apiClient";

export type FetchNameInfo =
  | { status: "LOADING" }
  | { status: "RESULT"; data: NameInfo }
  | { status: "ERROR"; error: HTTPError };

interface Props {
  children: any;
}

const Auth = (props: Props) => {
  const [{ nameInfo }, dispatch] = useStore();

  useEffect(() => {
    if (nameInfo.status === "LOADING") {
      sjekkAuthHentNavn()
        .then((result: NameInfo) => {
          dispatch({ type: "SETT_NAME_RESULT", payload: result });
        })
        .catch((error: AlertType) => {
          dispatch({ type: "SETT_NAME_ERROR", payload: error });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (nameInfo.status) {
    case "LOADING":
      return <Spinner />;
    case "RESULT":
      return <>{props.children}</>;
    case "ERROR":
      return <Error error={nameInfo.error} />;
  }
};

export default Auth;
