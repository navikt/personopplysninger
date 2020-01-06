import React, { Fragment } from "react";
import Lenke from "nav-frontend-lenker";
import { FormattedMessage } from "react-intl";
import konto from "assets/img/Konto.svg";
import { Link, useLocation } from "react-router-dom";
import { basePath } from "App";

const { REACT_APP_TJENESTER_URL } = process.env;

export interface BrodsmuleLenke {
  title: string;
  path?: string;
}

interface BrodsmuleProps {
  className?: string;
  children: "" | JSX.Element | JSX.Element[];
}

interface BrodsmulestiProps {
  hierarki?: BrodsmuleLenke[];
}

interface Routes {
  id: string;
}

const Brodsmule = (props: BrodsmuleProps) => (
  <div className={`brodsmule ${props.className || ""}`}>{props.children}</div>
);

const Brodsmulesti = (props: BrodsmulestiProps) => {
  const location = useLocation();
  const allPaths = location.pathname.split("/");
  const relevantPaths = allPaths.splice(3, allPaths.length);
  return (
    <div className="brodsmulesti">
      <Brodsmule className="brodsmulesti__icon">
        <img alt="Brodsmulesti" className="brodsmulesti__account" src={konto} />
      </Brodsmule>
      <Brodsmule>
        <Lenke href={`${REACT_APP_TJENESTER_URL}/dittnav`}>
          <FormattedMessage id="brodsmulesti.dittnav" />
        </Lenke>
      </Brodsmule>
      /
      <Brodsmule>
        {relevantPaths.length > 0 ? (
          <Link to={`${basePath}`} className="lenke">
            <FormattedMessage id="brodsmulesti.dinepersonopplysninger" />
          </Link>
        ) : (
          <FormattedMessage id="brodsmulesti.dinepersonopplysninger" />
        )}
      </Brodsmule>
      {props.hierarki &&
        props.hierarki.map((link, i) => (
          <Fragment key={i}>
            /
            <Brodsmule>
              {link.path ? (
                <Link to={`${basePath}${link.path}`} className="lenke">
                  <FormattedMessage id={link.title} />
                </Link>
              ) : (
                <span>
                  <FormattedMessage id={link.title} />
                </span>
              )}
            </Brodsmule>
          </Fragment>
        ))}
    </div>
  );
};
export default Brodsmulesti;
