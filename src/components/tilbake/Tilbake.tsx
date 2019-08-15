import { HashLink as Link } from "react-router-hash-link";
import { basePath } from "../../App";
import { VenstreChevron } from "nav-frontend-chevron";
import React from "react";
import { FormattedMessage } from "react-intl";

interface Props {
  to: string;
}

const Tilbake = (props: Props) => {
  const { to } = props;

  return (
    <Link to={`${basePath}${to}`} className="lenke">
      <VenstreChevron />
      <FormattedMessage id="side.tilbake" />
    </Link>
  );
};

export default Tilbake;
