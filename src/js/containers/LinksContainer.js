/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'less/index.less';
import links from '../links';
import LinkBox from '../components/LinkBox';

class LinksContainer extends Component {

  render() {

    console.log('links');
    console.log(links);

    return (
      <React.Fragment>
        {links.map(link =>
          <LinkBox
            header={link.header}
            information={link.information}
            url={link.url}
            linkText={link.linkText}
            kilde={link.kilde}
          />
        )}
      </React.Fragment>
    );
  }
}

LinksContainer.propTypes = {
  links: PropTypes.shape({}).isRequired,
};

export default LinksContainer;
