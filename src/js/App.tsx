import React, { Component } from "react";
import NavFrontendSpinner from "nav-frontend-spinner";
import { Meny, Filler } from "./components/Meny";
import Error from "./components/Error";
import ContentWrapper from "./ContentWrapper";
import { PersonInfo } from "../types/personInfo";
import { HTTPError } from "./components/Error";
import api from "./Api";
import "less/index.less";

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
        return (
          <main role="main">
            <Meny />
            <ContentWrapper personInfo={this.state.personInfo} />
            <Filler />
          </main>
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
