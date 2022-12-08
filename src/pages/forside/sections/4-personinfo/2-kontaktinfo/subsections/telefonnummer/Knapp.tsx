import React from "react";
import { Button } from "@navikt/ds-react";
import { FormattedMessage } from "react-intl";

interface Props {
  ariaLabel: string;
  onClick: () => void;
  ikon: string;
  tekstId: string;
}

const Knapp = (props: Props) => {
  const { ariaLabel, onClick, ikon, tekstId } = props;
  return (
    <Button
      variant={"tertiary"}
      type={"button"}
      className={"knapp-med-ikon"}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <div className={"tlfnummer__knapp-ikon"}>
        <img alt="" src={ikon} />
      </div>
      <div className={"tlfnummer__knapp-tekst"}>
        <FormattedMessage id={tekstId} />
      </div>
    </Button>
  );
};

export default Knapp;
