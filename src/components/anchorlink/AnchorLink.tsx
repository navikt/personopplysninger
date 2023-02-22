import React from "react";
import linkIcon from "assets/img/AnchorLink.svg";
import { Link } from "@navikt/ds-react";
import { useIntlFormatter } from "hooks/useIntlFormatter";

type Props = {
  id: string;
};

export const AnchorLink = ({ id }: Props) => {
  const { formatMessage } = useIntlFormatter();
  return (
    <Link
      href={`#${id}`}
      className={"anchor-link"}
    >
      <img src={linkIcon} alt="" />
      {formatMessage("anker.lenkehit")}
    </Link>
  );
};
