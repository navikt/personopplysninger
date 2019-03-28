import React, { useState, useEffect } from "react";
import { Ingress, Systemtittel } from "nav-frontend-typografi";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import Panel from "nav-frontend-paneler";
import Icon from "../icon/Icon";
import infoContent from "../../static/infoContent";

interface Props {
  id: string;
  header: string;
  icon?: string;
  infoType?: string;
  children: JSX.Element | JSX.Element[];
}

const Box = (props: Props) => {
  const { header, icon, infoType, children, id } = props;
  const [erMobil, setErMobil] = useState(window.innerWidth <= 420);

  const desktopVersjon = (
    <Panel className="box">
      <div className="icon__container" id={id}>
        {icon && <Icon src={icon} />}
      </div>
      <div className="box__content-container">
        <div className="box__header" id={id}>
          {header && <Systemtittel>{header}</Systemtittel>}
          {infoType && (
            <div className="box__ingress">
              <Ingress>{infoContent[infoType].content}</Ingress>
            </div>
          )}
        </div>
        <div className="box__content">{children}</div>
      </div>
    </Panel>
  );

  const mobilVersjon = (
    <div className="box" id={id}>
      <Ekspanderbartpanel tittel={header} tittelProps="systemtittel">
        <div className="box">
          {infoType && (
            <div className="box__ingress">
              <Ingress>{infoContent[infoType].content}</Ingress>
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

export default Box;
