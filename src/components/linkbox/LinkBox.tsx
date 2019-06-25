import React from "react";
import { Element, Normaltekst } from "nav-frontend-typografi";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import Icon from "../icon/Icon";
import Lenke from "nav-frontend-lenker";
import { HoyreChevron } from "nav-frontend-chevron";

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
    <a className="linkbox__rad" href={props.url}>
      <div className="linkbox__icon-container icon__container">
        <Icon backgroundImage={props.icon} />
      </div>
      <div className="linkbox__content">
        <div className="linkbox__seksjon">
          <div className="linkbox__tittel">
            <div className="lenke">
              <Element>
                <FormattedMessage id={props.tittel} />
              </Element>
            </div>
          </div>
          <Normaltekst>
            <FormattedMessage id={props.beskrivelse} />
          </Normaltekst>
        </div>
      </div>
      <HoyreChevron />
    </a>
  );
};

export default injectIntl(LinkBox);
