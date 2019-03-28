import React, { useState } from "react";
import { Undertittel, Normaltekst, Systemtittel } from "nav-frontend-typografi";
import infoIcon from "../../../assets/img/infomation-circle.svg";
import InfoBox from "../../infobox/InfoBox";
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

const Desktop = (props: Props) => {
  const [visInfo, setVisInfo] = useState(false);
  return (
    <div className="linkbox__container">
      <div className="icon__container">
        <Icon src={props.icon} />
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
};
export default Desktop;
