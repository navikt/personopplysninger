import React, { useState, useEffect } from "react";
import { Ingress, Systemtittel } from "nav-frontend-typografi";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import { FormattedMessage, injectIntl, InjectedIntlProps } from "react-intl";
import Panel from "nav-frontend-paneler";
import Icon from "../icon/Icon";

interface Props {
  id: string;
  tittel: string;
  beskrivelse?: string;
  icon?: string;
  children: JSX.Element | JSX.Element[];
}

const Box = (props: Props & InjectedIntlProps) => {
  const { tittel, beskrivelse, icon, children, id, intl } = props;
  const [erMobil, setErMobil] = useState(window.innerWidth <= 420);

  const desktopVersjon = (
    <Panel className="box">
      <div className="icon__container" id={id}>
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
    </Panel>
  );

  const mobilVersjon = (
    <div className="box" id={id}>
      <Ekspanderbartpanel
        tittel={intl.formatMessage({ id: tittel })}
        tittelProps="systemtittel"
      >
        <div className="box">
          {beskrivelse && (
            <div className="box__ingress">
              <Ingress>
                <FormattedMessage id={beskrivelse} />
              </Ingress>
              <hr className="box__linje-smal" />
            </div>
          )}
          <div className="box__content">{children}</div>
        </div>
      </Ekspanderbartpanel>
    </div>
  );

  useEffect(() => {
    window.addEventListener("resize", () =>
      setErMobil(window.innerWidth <= 420)
    );
    return () => {
      window.removeEventListener("resize", () =>
        setErMobil(window.innerWidth <= 420)
      );
    };
  });

  return <>{erMobil ? mobilVersjon : desktopVersjon}</>;
};

export default injectIntl(Box);
