import React from "react";
import { Systemtittel, Normaltekst } from "nav-frontend-typografi";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import { LenkepanelBase } from "nav-frontend-lenkepanel";
import Icon from "../icon/Icon";

export interface Props {
  id: string;
  tittel: string;
  beskrivelse: string;
  lenkeTekst: string;
  url: string;
  icon?: string;
}

const LinkBox = (props: Props & InjectedIntlProps) => {
  return (
    <LenkepanelBase href={props.url} className="box__container">
      <div className="linkbox__icon-container icon__container">
        <Icon backgroundImage={props.icon} />
      </div>
      <div className="linkbox__content">
        <div className="linkbox__seksjon">
          <div className="linkbox__tittel">
            <Systemtittel>
              <FormattedMessage id={props.tittel} />
            </Systemtittel>
          </div>
          <Normaltekst>
            <FormattedMessage id={props.beskrivelse} />
          </Normaltekst>
        </div>
      </div>
    </LenkepanelBase>
  );
};

export default injectIntl(LinkBox);
