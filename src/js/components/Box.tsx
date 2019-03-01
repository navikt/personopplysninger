import React, { useState, useEffect } from "react";
import { Ingress, Systemtittel } from "nav-frontend-typografi";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import Panel from "nav-frontend-paneler";
import infoContent from "../static/infoContent";

const Box = (props: any) => {
  const { header, icon, infoType, children, id } = props;
  const [erMobil, setErMobil] = useState(window.innerWidth <= 420);

  const desktopVersjon = (
    <Panel className="box">
      <div className="box__header" id={id}>
        {icon ? <img src={icon} alt="" className="box__icon" /> : null}
        {header ? <Systemtittel>{header}</Systemtittel> : null}
        {infoType ? (
          <>
            <hr className="box__linje-smal" />
            <Ingress>{infoContent[infoType].content}</Ingress>
            <hr className="box__linje-bred" />
          </>
        ) : null}
      </div>
      <div className="box__content">{children}</div>
    </Panel>
  );

  const mobilVersjon = (
    <div className="box" id={id}>
      <Ekspanderbartpanel tittel={header} tittelProps="systemtittel">
        <div className="box">
          {infoType ? (
            <>
              <Ingress>{infoContent[infoType].content}</Ingress>
              <hr className="box__linje-smal" />
            </>
          ) : null}
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
