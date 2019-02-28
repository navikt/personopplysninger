/* eslint-disable react/no-danger */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Undertekst, Ingress, Undertittel, Normaltekst } from "nav-frontend-typografi";
import Box from "./Box";
import infoIcon from "../../assets/img/infomation-circle.svg";
import InfoBox from "./InfoBox";

class LinkBox extends Component {
  constructor(props) {
    super(props);
    this.state = { displayInfo: false };
  }

  render() {
    const {
      id,
      header,
      information,
      url,
      linkText,
      kilde,
      icon,
      infoBoxContent
    } = this.props;

    const { displayInfo } = this.state;

    const toggleInfo = () => {
      this.setState({
        displayInfo: !displayInfo
      });
    };

    return (
      <Box id={id} header={header} icon={icon}>
        {infoBoxContent ? (
          <button
            type="button"
            className="information-circle"
            onClick={() => toggleInfo()}
          >
            <img src={infoIcon} alt="Information" />
          </button>
        ) : null}
        {displayInfo && infoBoxContent ? (
          <InfoBox>
            <Undertittel>Informasjon om {header}</Undertittel>
            <Normaltekst className="info-content">
              <div dangerouslySetInnerHTML={infoBoxContent} />
            </Normaltekst>
          </InfoBox>
        ) : null}
        <div className="link-box-content">
          <Ingress>
            <div>{information}</div>
            <a
              className="lenke"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkText}
            </a>
          </Ingress>
          {kilde ? (
            <div className="box-footer link-footer">
              <Undertekst>
                Kilde: {kilde} {/* TODO: må gjøres om til intl */}
              </Undertekst>
            </div>
          ) : null}
        </div>
      </Box>
    );
  }
}

LinkBox.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string,
  header: PropTypes.string,
  information: PropTypes.string,
  url: PropTypes.string,
  linkText: PropTypes.string,
  kilde: PropTypes.string,
  infoBoxContent: PropTypes.shape({
    __html: PropTypes.string
  })
};

LinkBox.defaultProps = {
  icon: "",
  header: "",
  information: "",
  url: "",
  linkText: "",
  kilde: "",
  infoBoxContent: null
};

export default LinkBox;
