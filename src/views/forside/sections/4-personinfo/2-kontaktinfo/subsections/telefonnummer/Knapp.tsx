import { Button } from "@navikt/ds-react";
import type React from "react";
import { FormattedMessage } from "react-intl";
import tlfStyles from "./Telefonnummer.module.css";

interface Props {
    ariaLabel: string;
    onClick: () => void;
    ikon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>>;
    tekstId: string;
}

const Knapp = (props: Props) => {
    const { ariaLabel, onClick, ikon: Icon, tekstId } = props;
    return (
        <Button
            icon={<Icon className={tlfStyles.ikon} aria-hidden="true" />}
            variant={"tertiary"}
            className={"knapp-med-ikon"}
            onClick={onClick}
            aria-label={ariaLabel}
        >
            <FormattedMessage id={tekstId} />
        </Button>
    );
};

export default Knapp;
