import React, { Component } from "react";
import PropTypes from "prop-types";
import ContentWrapper from "js/ContentWrapper";
import Error from "js/components/Error";
import { Meny, Filler } from "js/components/Meny";
import "less/index.less";

import initialState from "./initialState";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillMount() {
    const { api } = this.props;
    api.fetchPersonInfo().then(r => {
      if (r.status && r.status !== 200) {
        this.setState({ statusCode: r.status });
      } else {
        this.setState({ ...r, statusCode: 200 });
      }
    });
  }

  render() {
    const { statusCode, personalia, adresser } = this.state;
    if (statusCode === 500) {
      return (
        <main role="main">
          <Error statusCode={statusCode} />
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
