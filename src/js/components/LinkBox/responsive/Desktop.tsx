import React, { useState } from "react";
import {
  Undertekst,
  Ingress,
  Undertittel,
  Normaltekst
} from "nav-frontend-typografi";
import infoIcon from "../../../../assets/img/infomation-circle.svg";
import InfoBox from "../../InfoBox";

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

const Desktop = (props: Props) => {
  const [visInfo, setVisInfo] = useState(false);
  return (
    <div className="linkbox__container">
      <div className="linkbox__icon-container">
        <img className="linkbox__icon" src={props.icon} />
      </div>
      <div className="linkbox__content">
        {props.infoBoxContent && (
          <>
            <button
              type="button"
              className="information-circle"
              onClick={() => setVisInfo(!visInfo)}
            >
              <img src={infoIcon} alt="Information" />
            </button>
            {visInfo && (
              <InfoBox>
                <Undertittel>Informasjon om {props.header}</Undertittel>
                <Normaltekst className="info-content">
                  <div dangerouslySetInnerHTML={props.infoBoxContent} />
                </Normaltekst>
              </InfoBox>
            )}
          </>
        )}
        <Ingress>{props.information}</Ingress>
        <Ingress>
          <a
            className="lenke"
            href={props.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.linkText}
          </a>
        </Ingress>
        {props.kilde && (
          <div className="box-footer link-footer">
            <Undertekst>
              Kilde: {props.kilde} {/* TODO: må gjøres om til intl */}
            </Undertekst>
          </div>
        )}
      </div>
    </div>
  );
};
export default Desktop;
