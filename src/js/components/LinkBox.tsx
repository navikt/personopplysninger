/* eslint-disable react/no-danger */
import React, { Component } from "react";
import {
  Undertekst,
  Ingress,
  Undertittel,
  Normaltekst
} from "nav-frontend-typografi";
import Box from "./Box";
import infoIcon from "../../assets/img/infomation-circle.svg";
import InfoBox from "./InfoBox";

interface Props {
  id: string;
  header: string;
  information: string;
  linkText: string;
  url: string;
  kilde?: string;
  icon?: string;
  infoBoxContent: {
    __html: string;
  };
}

interface State {
  displayInfo: boolean;
}

class LinkBox extends Component<Props, State> {
  state = { displayInfo: false };

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
        {infoBoxContent && (
          <>
            <button
              type="button"
              className="information-circle"
              onClick={() => toggleInfo()}
            >
              <img src={infoIcon} alt="Information" />
            </button>
            {displayInfo && (
              <InfoBox>
                <Undertittel>Informasjon om {header}</Undertittel>
                <Normaltekst className="info-content">
                  <div dangerouslySetInnerHTML={infoBoxContent} />
                </Normaltekst>
              </InfoBox>
            )}
          </>
        )}
        <div className="link-box-content">
          <Ingress>{information}</Ingress>
          <Ingress>
            <a
              className="lenke"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkText}
            </a>
          </Ingress>
          {kilde && (
            <div className="box-footer link-footer">
              <Undertekst>
                Kilde: {kilde} {/* TODO: må gjøres om til intl */}
              </Undertekst>
            </div>
          )}
        </div>
      </Box>
    );
  }
}

export default LinkBox;
