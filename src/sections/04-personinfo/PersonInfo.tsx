import React, { Component } from "react";
import NavFrontendSpinner from "nav-frontend-spinner";
import Error, { HTTPError } from "../../components/error/Error";
import Header from "../03-header/Header";
import Personalia from "./personalia/Personalia";
import Adresser from "./adresser/Adresser";
import { formatName } from "../../utils/text";
import { PersonInfo } from "../../types/personInfo";
import api from "../../clients/apiClient";

type State =
  | { status: "LOADING" }
  | { status: "RESULT"; personInfo: PersonInfo }
  | { status: "ERROR"; error: HTTPError };

class App extends Component<{}, State> {
  state: State = {
    status: "LOADING"
  };

  componentDidMount() {
    api
      .fetchPersonInfo()
      .then((personInfo: PersonInfo) =>
        this.setState({
          status: "RESULT",
          personInfo
        })
      )
      .catch((error: HTTPError) =>
        this.setState({
          status: "ERROR",
          error
        })
      );
  }

  render() {
    switch (this.state.status) {
      case "LOADING":
        return (
          <div className="spinner-wrapper">
            <NavFrontendSpinner type="XL" />
          </div>
        );
      case "RESULT":
        const { personalia, adresser } = this.state.personInfo;
        return (
          <>
            {personalia && (
              <>
                <Header fornavn={formatName(personalia.fornavn)} />
                <Personalia personalia={personalia} />
              </>
            )}
            {adresser && <Adresser adresser={adresser} />}
          </>
        );
      case "ERROR":
        return (
          <main role="main">
            <Error error={this.state.error} />
          </main>
        );
    }
  }
}

export default App;
