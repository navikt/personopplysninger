import React from "react";
import { Link } from "react-router-dom";
import { basePath } from "App";
import { VenstreChevron } from "nav-frontend-chevron";
import { FormattedMessage } from "react-intl";
import { useStore } from "../../store/Context";

interface Props {
  to: string;
}

const Tilbake = (props: Props) => {
  const { to } = props;
  const [{ locale }] = useStore();

  return (
    <Link to={`${basePath}/${locale}${to}`} className="lenke">
      <VenstreChevron />
      <FormattedMessage id="side.tilbake" />
    </Link>
  );
};

export default Tilbake;
