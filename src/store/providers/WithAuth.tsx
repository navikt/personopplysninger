import React, { useEffect } from "react";
import { useStore } from "../Context";
import { fetchInnloggingsStatus, sendTilLogin } from "../../clients/apiClient";
import { Auth } from "../../types/authInfo";
import Spinner from "../../components/spinner/Spinner";

type Props = {
  children: JSX.Element;
};

export const WithAuth = ({ children }: Props) => {
  const [{ authInfo }, dispatch] = useStore();

  useEffect(() => {
    fetchInnloggingsStatus().then((auth: Auth) => {
      if (!auth?.authenticated || auth.securityLevel !== "4") {
        sendTilLogin();
      } else {
        dispatch({ type: "SETT_AUTH_RESULT", payload: auth });
      }
    });
  }, [dispatch]);

  return authInfo.status === "RESULT" ? children : <Spinner text={"Logger inn..."} />;
};
