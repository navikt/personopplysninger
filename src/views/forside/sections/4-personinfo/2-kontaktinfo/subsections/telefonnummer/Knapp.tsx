import { Button } from "@navikt/ds-react";
import type React from "react";
import tlfStyles from "./Telefonnummer.module.css";

interface Props {
    ariaLabel: string;
    onClick: () => void;
    ikon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>>;
    tekst: string;
}

const Knapp = (props: Props) => {
    const { ariaLabel, onClick, ikon: Icon, tekst } = props;
    return (
        <Button icon={<Icon className={tlfStyles.ikon} aria-hidden="true" />} variant={"tertiary"} onClick={onClick} aria-label={ariaLabel}>
            {tekst}
        </Button>
    );
};

export default Knapp;
