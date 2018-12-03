import React, { Component } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import PropTypes from 'prop-types';

class Alternativ extends Component {
  render() {
    const { description, content } = this.props;

    return (
      <React.Fragment>
        <div className="alternativ-box">
          <Ekspanderbartpanel
            className="alternativ-panel"
            tittel={description}
            tittelProps="element"
          >
            {content}
          </Ekspanderbartpanel>
        </div>
      </React.Fragment>
    );
  }
}

Alternativ.propTypes = {
  description: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Alternativ;
