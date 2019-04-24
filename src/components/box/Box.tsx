import React from "react";
import { Ingress, Systemtittel } from "nav-frontend-typografi";
import { FormattedMessage, injectIntl, InjectedIntlProps } from "react-intl";
import Icon from "../icon/Icon";

interface Props {
  id: string;
  tittel: string;
  beskrivelse?: string;
  icon?: string;
  children: JSX.Element | JSX.Element[];
}

const Box = (props: Props & InjectedIntlProps) => {
  const { tittel, beskrivelse, icon, children, id } = props;

  return (
    <div className="box__container seksjon">
      <div className="box__icon-container icon__container" id={id}>
        {icon && <Icon backgroundImage={icon} />}
      </div>
      <div className="box__content-container">
        <div className="box__header" id={id}>
          {tittel && (
            <Systemtittel>
              <FormattedMessage id={tittel} />
            </Systemtittel>
          )}
          {beskrivelse && (
            <div className="box__ingress">
              <Ingress>
                <FormattedMessage id={beskrivelse} />
              </Ingress>
            </div>
          )}
        </div>
        <div className="box__content">{children}</div>
      </div>
    </div>
  );
};

export default injectIntl(Box);
