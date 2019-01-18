import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import folderBlock from '../../assets/img/folder-block.png';
import infoContent from '../static/infoContent';

class FooterInfo extends Component {
  render() {
    return (
      <div className="BoxContainer">
        <div className="footer-info">
          <img src={folderBlock} className="folder-block-icon" alt="Information" />
          <div className="footer-text-header">
            <FormattedMessage id="footer.header" />
          </div>
          <div className="footer-text-content">
            <div dangerouslySetInnerHTML={infoContent.footer.content} />
          </div>
        </div>
      </div>
    );
  }
}

export default FooterInfo;
