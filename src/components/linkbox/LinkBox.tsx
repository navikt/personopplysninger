import React from "react";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import Icon from "../icon/Icon";

export interface Props {
  id: string;
  tittel: string;
  beskrivelse: string;
  lenkeTekst: string;
  url: string;
  icon?: string;
}

const LinkBox = (props: Props) => {
  return (
    <div className="box__container">
      <div className="icon__container">
        <Icon backgroundImage={props.icon} />
      </div>
      <div className="linkbox__content">
        <div className="linkbox__tittel">
          <Systemtittel>
            <FormattedMessage id={props.tittel} />
          </Systemtittel>
        </div>
        <div className="linkbox__rad">
          <div className="linkbox__seksjon">
            <Normaltekst>
              <FormattedMessage id={props.beskrivelse} />
            </Normaltekst>
          </div>
          <div className="linkbox__seksjon linkbox__lenke-container">
            <Normaltekst>
              <a
                className="lenke"
                href={props.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FormattedMessage id={props.lenkeTekst} />
              </a>
            </Normaltekst>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkBox;
