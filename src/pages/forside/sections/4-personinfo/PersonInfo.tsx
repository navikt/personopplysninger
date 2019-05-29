import React, { useState, useEffect } from "react";
import Error, { HTTPError } from "../../../../components/error/Error";
import Header from "../3-header/Header";
import Personalia from "./personalia/Personalia";
import Adresser from "./adresser/Adresser";
import Spinner from "../../../../components/spinner/Spinner";
import { formatName } from "../../../../utils/text";
import { PersonInfo } from "../../../../types/personInfo";
import { fetchPersonInfo } from "../../../../clients/apiClient";

type State =
  | { status: "LOADING" }
  | { status: "RESULT"; personInfo: PersonInfo }
  | { status: "ERROR"; error: HTTPError };

// Lagre i minne og ikke i
// sessionStorage pga sensitive data
let persistState: State = { status: "LOADING" };

const VisPersonInfo = () => {
  const [state, setState] = useState(persistState);

  useEffect(() => {
    if (state.status === "LOADING") {
      fetchPersonInfo()
        .then((personInfo: PersonInfo) =>
          setState({ status: "RESULT", personInfo })
        )
        .catch((error: HTTPError) =>
          setState({ status: "ERROR", error: error })
        );
    }
    return () => {
      persistState = state;
    };
  }, []);

  switch (state.status) {
    default:
    case "LOADING":
      return <Spinner />;
    case "RESULT":
      const elements = [];
      const { personalia, adresser } = state.personInfo;

      if (personalia) {
        const fornavn = formatName(personalia.fornavn);
        elements.push(<Header key="h" fornavn={fornavn} />);
        elements.push(<Personalia key="p" personalia={personalia} />);
      }

      if (adresser) {
        elements.push(<Adresser key="a" adresser={adresser} />);
      }

      return <>{elements}</>;
    case "ERROR":
      return <Error error={state.error} />;
  }
};

export default VisPersonInfo;
