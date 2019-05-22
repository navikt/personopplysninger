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

const initialState: State = {
  status: "LOADING"
};

type Action = {
  type: string;
  payload?: any;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOADING":
      return { status: "LOADING" };
    case "RESULT":
      return { status: "RESULT", personInfo: action.payload };
    case "ERROR":
      return { status: "ERROR", error: action.payload };
    default:
      return state;
  }
};

const VisPersonInfo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.status !== "RESULT") {
      dispatch({ type: "LOADING" });
      fetchPersonInfo()
        .then((personInfo: PersonInfo) =>
          dispatch({ type: "RESULT", payload: personInfo })
        )
        .catch((error: HTTPError) =>
          dispatch({ type: "RESULT", payload: error })
        );
    }
  });

  switch (state.status) {
    default:
    case "LOADING":
      return <Spinner />;
    case "RESULT":
      const { personalia, adresser } = state.personInfo;
      return (
        <>
          {personalia && <Header fornavn={formatName(personalia.fornavn)} />}
          {personalia && <Personalia personalia={personalia} />}
          {adresser && <Adresser adresser={adresser} />}
        </>
      );
    case "ERROR":
      return <Error error={state.error} />;
  }
};

export default VisPersonInfo;
