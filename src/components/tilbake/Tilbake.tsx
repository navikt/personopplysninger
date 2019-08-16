import React, { MouseEvent } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { basePath } from "../../App";
import { VenstreChevron } from "nav-frontend-chevron";
import { FormattedMessage } from "react-intl";

interface Props {
  to: string;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}

const Tilbake = (props: Props) => {
  const { to, onClick } = props;

  return (
    <Link to={`${basePath}${to}`} className="lenke" onClick={onClick}>
      <VenstreChevron />
      <FormattedMessage id="side.tilbake" />
    </Link>
  );
};

export default Tilbake;
