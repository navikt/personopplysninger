import React, { Component } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import PropTypes from 'prop-types';

class Alternativ extends Component {
  render() {
    const { description, content } = this.props;

    return (
      <React.Fragment>
        <Ekspanderbartpanel
          className="alternativ-panel"
          tittel={description}
          tittelProps="element"
        >
          {content}
        </Ekspanderbartpanel>
      </React.Fragment>
    );
  }
}

Alternativ.propTypes = {
  description: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Alternativ;
