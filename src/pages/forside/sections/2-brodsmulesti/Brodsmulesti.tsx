import React, { Fragment } from "react";
import Lenke from "nav-frontend-lenker";
import { FormattedMessage } from "react-intl";
import Environment from "../../../../utils/Environments";
import konto from "../../../../assets/img/Konto.svg";
import { withRouter, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { basePath } from "../../../../App";

const { tjenesteUrl } = Environment();

interface BrodsmuleProps {
  className?: string;
  children: "" | JSX.Element | JSX.Element[];
}

interface BrodsmulestiProps {
  hierarchy?: {
    title: string;
    path?: string;
  }[];
}

interface Routes {
  id: string;
}

const Brodsmule = (props: BrodsmuleProps) => (
  <div className={`brodsmule ${props.className || ""}`}>{props.children}</div>
);

const Brodsmulesti = (
  props: BrodsmulestiProps & RouteComponentProps<Routes>
) => {
  const allPaths = props.location.pathname.split("/");
  const relevantPaths = allPaths.splice(3, allPaths.length);
  return (
    <div className="brodsmulesti">
      <Brodsmule className="brodsmulesti__icon">
        <img alt="Brodsmulesti" className="brodsmulesti__account" src={konto} />
      </Brodsmule>
      <Brodsmule>
        <Lenke href={`${tjenesteUrl}/dittnav`}>
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
      {props.hierarchy &&
        props.hierarchy.map((link, i) => (
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
export default withRouter(Brodsmulesti);
