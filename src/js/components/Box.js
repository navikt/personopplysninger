import React from "react";
import PropTypes from "prop-types";
import { Ingress, Systemtittel } from "nav-frontend-typografi";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import Panel from "nav-frontend-paneler";
import infoContent from "../static/infoContent";

const Box = props => {
  const { header, icon, infoType, children } = props;

  const erMobil = window.innerWidth <= 420;

  if (!infoType) {
    return null;
  }

  const desktopVersjon = (
    <Panel className="box">
      <div className="box__header">
        {icon ? (
          <img src={icon} alt="" className="box__icon" />
        ) : null}
        <Systemtittel>{header}</Systemtittel>
        <hr className="box__linje-smal" />
        <Ingress>{infoContent[infoType].content}</Ingress>
        <hr className="box__linje-bred" />
      </div>
      <div className="box__content">{children}</div>
    </Panel>
  );

  const mobilVersjon = (
    <div className="box">
      <Ekspanderbartpanel
        tittel={header}
        tittelProps="systemtittel"
      >
        <div className="box">
          <Ingress>{infoContent[infoType].content}</Ingress>
          <hr className="box__linje-smal" />
          <div className="box__content">{children}</div>
        </div>
      </Ekspanderbartpanel>
    </div>
  );

  return <>{erMobil ? mobilVersjon : desktopVersjon}</>;
};

Box.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  header: PropTypes.string,
  icon: PropTypes.string,
  infoType: PropTypes.string
};

Box.defaultProps = {
  children: [],
  header: "",
  icon: "",
  infoType: ""
};

export default Box;
