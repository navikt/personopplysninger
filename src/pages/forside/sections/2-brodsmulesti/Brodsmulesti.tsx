import React, { Fragment } from "react";
import Lenke from "nav-frontend-lenker";
import { FormattedMessage } from "react-intl";
import Environment from "../../../../utils/Environments";
import konto from "../../../../assets/img/Konto.svg";
import { withRouter, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { basePath } from "../../../../App";

const { tjenesteUrl } = Environment();

interface Props {
  className?: string;
  children: "" | JSX.Element | JSX.Element[];
}

interface Routes {
  id: string;
}

const Brodsmule = (props: Props) => (
  <div className={`brodsmule ${props.className || ""}`}>{props.children}</div>
);

const Brodsmulesti = (props: RouteComponentProps<Routes>) => {
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
      {relevantPaths.map((path, key) =>
        key !== relevantPaths.length - 1 ? (
          <>
            /
            <Link
              to={`${basePath}${relevantPaths
                .filter((p, i) => i <= key)
                .map(p => `/${p}`)
                .join("")}`}
              className="lenke brodsmulesti__lenke"
              key={key}
            >
              <Brodsmule>
                <>{path}</>
              </Brodsmule>
            </Link>
          </>
        ) : (
          <Fragment key={key}>
            /
            <Brodsmule>
              <>{path}</>
            </Brodsmule>
          </Fragment>
        )
      )}
    </div>
  );
};
export default withRouter(Brodsmulesti);
