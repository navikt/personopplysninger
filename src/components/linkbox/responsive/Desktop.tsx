import React from "react";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";
import Icon from "../../icon/Icon";

interface Props {
  id: string;
  header: string;
  information: string;
  linkText: string;
  url: string;
  icon?: string;
  infoBoxContent: {
    __html: string;
  };
}

const Desktop = (props: Props) => (
  <div className="linkbox__container">
    <div className="icon__container">
      <Icon backgroundImage={props.icon} />
    </div>
    <div className="linkbox__content">
      <div className="linkbox__seksjon">
        <div className="linkbox__tittel">
          <Systemtittel>{props.header}</Systemtittel>
        </div>
        <Normaltekst>{props.information}</Normaltekst>
      </div>
      <div className="linkbox__seksjon linkbox__lenke-container">
        <Normaltekst>
          <a
            className="lenke"
            href={props.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.linkText}
          </a>
        </Normaltekst>
      </div>
    </div>
  </div>
);
export default Desktop;
