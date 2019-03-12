/* eslint-disable react/no-danger */
import React, { useState, useEffect } from "react";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import Panel from "nav-frontend-paneler";
import {
  Undertekst,
  Ingress,
  Undertittel,
  Normaltekst
} from "nav-frontend-typografi";
import infoIcon from "../../assets/img/infomation-circle.svg";
import InfoBox from "./InfoBox";

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

const LinkBox = (props: Props) => {
  const [erMobil, setErMobil] = useState(window.innerWidth <= 420);
  const [visInfo, setVisInfo] = useState(false);
  const {
    id,
    header,
    information,
    url,
    linkText,
    kilde,
    icon,
    infoBoxContent
  } = props;

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

  return (
    <>
      {erMobil ? (
        <div className="box" id={id}>
          <Ekspanderbartpanel tittel={header} tittelProps="systemtittel">
            <div className="box">
              <div className="box__content">
                <Ingress>{information}</Ingress>
                <Ingress>
                  <a
                    className="lenke"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {linkText}
                  </a>
                </Ingress>
                {kilde && (
                  <div className="box-footer link-footer">
                    <Undertekst>
                      Kilde: {kilde} {/* TODO: må gjøres om til intl */}
                    </Undertekst>
                  </div>
                )}
              </div>
            </div>
          </Ekspanderbartpanel>
        </div>
      ) : (
        <div className="linkbox__container">
          <div className="linkbox__icon-container">
            <img className="linkbox__icon" src={icon} />
          </div>
          <div className="linkbox__content">
            {infoBoxContent && (
              <>
                <button
                  type="button"
                  className="information-circle"
                  onClick={() => setVisInfo(!visInfo)}
                >
                  <img src={infoIcon} alt="Information" />
                </button>
                {visInfo && (
                  <InfoBox>
                    <Undertittel>Informasjon om {header}</Undertittel>
                    <Normaltekst className="info-content">
                      <div dangerouslySetInnerHTML={infoBoxContent} />
                    </Normaltekst>
                  </InfoBox>
                )}
              </>
            )}
            <Ingress>{information}</Ingress>
            <Ingress>
              <a
                className="lenke"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkText}
              </a>
            </Ingress>
            {kilde && (
              <div className="box-footer link-footer">
                <Undertekst>
                  Kilde: {kilde} {/* TODO: må gjøres om til intl */}
                </Undertekst>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LinkBox;
