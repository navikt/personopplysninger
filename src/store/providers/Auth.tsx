import React, { useEffect } from "react";
import Error, { HTTPError } from "components/error/Error";
import { useStore } from "../Context";
import { NameInfo } from "types/nameInfo";
import Spinner from "components/spinner/Spinner";

export type FetchNameInfo =
  | { status: "LOADING" }
  | { status: "RESULT"; data: NameInfo }
  | { status: "ERROR"; error: HTTPError };

interface Props {
  children: JSX.Element;
}

const Auth = (props: Props) => {
  const [{ nameInfo }, dispatch] = useStore();

  useEffect(() => {
    const receiveMessage = ({ data }: MessageEvent) => {
      const { source, event, payload } = data;
      if (source === "decorator" && event === "auth") {
        dispatch({ type: "SETT_NAME_RESULT", payload });
      }
    };
    window.addEventListener("message", receiveMessage, false);
    return () => {
      window.removeEventListener("message", receiveMessage, false);
    };
  });

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
