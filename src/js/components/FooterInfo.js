import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import folderBlock from '../../assets/img/folder-block.png';

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
            <span><FormattedMessage id="footer.content.line1" /></span>
            <span><FormattedMessage id="footer.content.line2" /></span>
            <span><FormattedMessage id="footer.content.line3" /></span>
            <span><FormattedMessage id="footer.content.line4" /></span>
          </div>
        </div>
      </div>
    );
  }
}

export default FooterInfo;
