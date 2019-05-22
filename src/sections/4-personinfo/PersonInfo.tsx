import React, { useReducer, useEffect } from "react";
import Error, { HTTPError } from "../../components/error/Error";
import Header from "../3-header/Header";
import Personalia from "./personalia/Personalia";
import Adresser from "./adresser/Adresser";
import Spinner from "../../components/spinner/Spinner";
import { formatName } from "../../utils/text";
import { PersonInfo } from "../../types/personInfo";
import { fetchPersonInfo } from "../../clients/apiClient";

type State =
  | { status: "LOADING" }
  | { status: "RESULT"; personInfo: PersonInfo }
  | { status: "ERROR"; error: HTTPError };

let initState: State = { status: "LOADING" };

type Action = {
  type: "SETT_LOADING" | "SETT_RESULT" | "SETT_ERROR";
  payload?: PersonInfo | HTTPError;
};

const reducer = (state: State, action: Action): State => {
  const newState = ({
    SETT_LOADING: { status: "LOADING" },
    SETT_RESULT: { status: "RESULT", personInfo: action.payload },
    SETT_ERROR: { status: "ERROR", error: action.payload },
    default: state
  } as { [key in Action["type"]]: State })[action.type];
  return newState;
};

const VisPersonInfo = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    if (state.status !== "RESULT") {
      fetchPersonInfo()
        .then((personInfo: PersonInfo) =>
          dispatch({ type: "SETT_RESULT", payload: personInfo })
        )
        .catch((error: HTTPError) =>
          dispatch({ type: "SETT_ERROR", payload: error })
        );
    }
    return () => {
      initState = state;
    };
  }, [state]);

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
