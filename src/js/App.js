import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentWrapper from 'js/ContentWrapper';
import Header from 'js/components/Header';
import 'less/index.less';

import initialState from './initialStateNy';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentWillMount() {
    this.props.api.fetchPersonInfo()
      .then((r) => {
        this.setState(r);
      });
  }
  render() {

    return (
      <main role="main">
        <Header />
        <ContentWrapper
          userInfo={this.state}
        />
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
