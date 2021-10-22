import React from "react";
import Lenke from "nav-frontend-lenker";
import linkIcon from "assets/img/AnchorLink.svg";

type Props = {
    id: string;
};

export const AnchorLink = ({id}: Props) => {

    return (
        <Lenke href={`#${id}`} className={"anchor-link"}>
            <img src={linkIcon} alt={""}/>{"Lenke hit"}
        </Lenke>
    );
};
