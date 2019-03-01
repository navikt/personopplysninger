import React, { Component } from "react";
import NavFrontendSpinner from "nav-frontend-spinner";
import { Meny, Filler } from "./components/Meny";
import Error from "./components/Error";
import ContentWrapper from "./ContentWrapper";
import "less/index.less";

import initialState from "./initialState";

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const { api } = this.props;
    api
      .fetchPersonInfo()
      .then((response: any) => this.setState({ ...response }))
      .catch((error: any) => this.setState({ ...error }))
      .then(() => this.setState({ loading: false }));
  }

  render() {
    const { error, personalia, adresser, loading } = this.state;

    if (loading) {
      return (
        <div className="spinner-wrapper">
          <NavFrontendSpinner type="XL" />
        </div>
      );
    }

    if (error) {
      return (
        <main role="main">
          <Error error={error} />
        </main>
      );
    }

    return (
      <main role="main">
        <Meny />
        <ContentWrapper personalia={personalia} adresser={adresser} />
        <Filler />
      </main>
    );
  }
}

export default App;
