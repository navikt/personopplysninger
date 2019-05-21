import React, { Component } from "react";
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

class VisPersonInfo extends Component<{}, State> {
  static state: State = {
    status: "LOADING"
  };

  componentDidMount = () => {
    if (VisPersonInfo.state.status !== "RESULT") {
      fetchPersonInfo()
        .then((personInfo: PersonInfo) => {
          VisPersonInfo.state = { status: "RESULT", personInfo };
        })
        .catch((error: HTTPError) => {
          VisPersonInfo.state = { status: "ERROR", error };
        })
        .then(() => this.forceUpdate());
    }
  };

  render = () => {
    switch (VisPersonInfo.state.status) {
      default:
      case "LOADING":
        return <Spinner />;
      case "RESULT":
        const { personalia, adresser } = VisPersonInfo.state.personInfo;
        return (
          <>
            {personalia && <Header fornavn={formatName(personalia.fornavn)} />}
            {personalia && <Personalia personalia={personalia} />}
            {adresser && <Adresser adresser={adresser} />}
          </>
        );
      case "ERROR":
        return <Error error={VisPersonInfo.state.error} />;
    }
  };
}

export default VisPersonInfo;
