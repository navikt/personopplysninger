import * as React from "react";
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
  const { id } = props.match.params;
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
        {id ? (
          <Link to={`${basePath}/`} className="lenke">
            <FormattedMessage id="brodsmulesti.dinepersonopplysninger" />
          </Link>
        ) : (
          <FormattedMessage id="brodsmulesti.dinepersonopplysninger" />
        )}
      </Brodsmule>
      {id && (
        <>
          /
          <Brodsmule>
            <FormattedMessage id="brodsmulesti.arbeidsforhold" />
          </Brodsmule>
        </>
      )}
    </div>
  );
};
export default withRouter(Brodsmulesti);
