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

class App extends Component<{}, State> {
  state: State = {
    status: "LOADING"
  };

  componentDidMount = () =>
    fetchPersonInfo()
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

  render = () => {
    switch (this.state.status) {
      case "LOADING":
        return <Spinner />;
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
        return <Error error={this.state.error} />;
    }
  };
}

export default App;
