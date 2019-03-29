import React from "react";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import { Ingress } from "nav-frontend-typografi";
import { Props } from "../LinkBox";

const Mobile = (props: Props) => (
  <div className="box" id={props.id}>
    <Ekspanderbartpanel tittel={props.tittel} tittelProps="systemtittel">
      <div className="box">
        <div className="box__content">
          <Ingress>{props.beskrivelse}</Ingress>
          <Ingress>
            <a
              className="lenke"
              href={props.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.lenkeTekst}
            </a>
          </Ingress>
        </div>
      </div>
    </Ekspanderbartpanel>
  </div>
);
export default Mobile;
