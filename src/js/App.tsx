import React, { Component } from "react";
import PropTypes from "prop-types";
import ContentWrapper from "js/ContentWrapper";
import Error from "js/components/Error";
import NavFrontendSpinner from "nav-frontend-spinner";
import { Meny, Filler } from "js/components/Meny";
import "less/index.less";

import initialState from "./initialState";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const { api } = this.props;
    api
      .fetchPersonInfo()
      .then(response => this.setState({ ...response }))
      .catch(error => this.setState({ ...error }))
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

App.propTypes = {
  api: PropTypes.shape({
    fetchPersonInfo: PropTypes.func.isRequired
  }).isRequired
};

export default App;
