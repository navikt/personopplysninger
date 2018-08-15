import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ContentWrapper from 'js/ContentWrapper';
import Header from 'js/components/Header';
import 'less/index.less';

class App extends Component {
  componentWillMount() {
    this.props.api.fetchPersonInfo()
      .then((r) => {
        console.log(r); //eslint-disable-line
      });
  }
  render() {
    return (
      <main role="main">
        <Header />
        <ContentWrapper />
      </main>
    );
  }
}

App.propTypes = {
  api: PropTypes.shape({
    fetchPersonInfo: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
