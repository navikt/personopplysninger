import React, { Component } from 'react';
import 'less/index.less';
import links from '../static/links';
import LinkBox from '../components/LinkBox';

class LinksContainer extends Component {
  render() {
    return (
      <React.Fragment>
        {links.map((link, index) =>
          (link.visible ?
            <LinkBox
              key={index} // eslint-disable-line react/no-array-index-key
              icon={link.icon}
              header={link.header}
              information={link.information}
              url={link.url}
              linkText={link.linkText}
              kilde={link.kilde}
              infoBoxContent={link.infoBoxContent}
            /> :
            null))}
      </React.Fragment>
    );
  }
}

export default LinksContainer;
