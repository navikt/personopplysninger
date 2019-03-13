import React from "react";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import { Undertekst, Ingress } from "nav-frontend-typografi";

interface Props {
  id: string;
  header: string;
  information: string;
  linkText: string;
  url: string;
  kilde?: string;
  icon?: string;
  infoBoxContent: {
    __html: string;
  };
}

const Mobile = (props: Props) => (
  <div className="box" id={props.id}>
    <Ekspanderbartpanel tittel={props.header} tittelProps="systemtittel">
      <div className="box">
        <div className="box__content">
          <Ingress>{props.information}</Ingress>
          <Ingress>
            <a
              className="lenke"
              href={props.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.linkText}
            </a>
          </Ingress>
          {props.kilde && (
            <div className="box-footer link-footer">
              <Undertekst>
                Kilde: {props.kilde} {/* TODO: må gjøres om til intl */}
              </Undertekst>
            </div>
          )}
        </div>
      </div>
    </Ekspanderbartpanel>
  </div>
);
export default Mobile;
