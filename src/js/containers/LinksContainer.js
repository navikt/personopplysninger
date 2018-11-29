import React, { Component } from 'react';
import 'less/index.less';
import links from '../links';
import LinkBox from '../components/LinkBox';

class LinksContainer extends Component {
  render() {
    return (
      <React.Fragment>
        {links.map(link =>
          (<LinkBox
            icon={link.icon}
            header={link.header}
            information={link.information}
            url={link.url}
            linkText={link.linkText}
            kilde={link.kilde}
          />))}
      </React.Fragment>
    );
  }
}

export default LinksContainer;
