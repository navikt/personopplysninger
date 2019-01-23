import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentWrapper from 'js/ContentWrapper';
import Header from 'js/components/Header';
import Error from 'js/components/Error';
import 'less/index.less';
import { formatName } from './utils/textUtils';

import initialState from './initialStateNy';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentWillMount() {
    this.props.api.fetchPersonInfo()
      .then((r) => {
        if (r.status && r.status !== 200) {
          this.setState({ statusCode: r.status });
        } else {
          this.setState({ ...r, statusCode: 200 });
        }
      });
  }
  render() {
    if (this.state.statusCode === 200) {
      return (
        <main role="main">
          <Header
            fornavn={formatName(this.state.personalia.fornavn)}
          />
          <ContentWrapper
            personalia={this.state.personalia}
            adresser={this.state.adresser}
          />
        </main>
      );
    }

    return (
      <main role="main">
        <Error
          statusCode={this.state.statusCode}
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
