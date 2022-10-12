import React from "react";
import linkIcon from "assets/img/AnchorLink.svg";
import { Link } from "@navikt/ds-react";

type Props = {
  id: string;
};

export const AnchorLink = ({ id }: Props) => {
  return (
    <Link href={`#${id}`} className={"anchor-link"}>
      <img src={linkIcon} alt={""} />
      {"Lenke hit"}
    </Link>
  );
};
